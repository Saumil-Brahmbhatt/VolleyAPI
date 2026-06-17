// State Management
let currentTab = 'players';
let currentData = [];
let isEditMode = false;

// Auth Check
const token = localStorage.getItem('adminToken');
if (!token) window.location.href = '/admin';

function logout() {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
}

// --- Core Fetching Logic ---
async function fetchData() {
    try {
        const endpoint = currentTab === 'players' ? '/api/v1/players' : '/api/v1/teams';
        const response = await fetch(endpoint);
        if (response.status === 401) return logout();
        
        currentData = await response.json();
        renderTable();
    } catch (error) {
        console.error('Error fetching data:', error);
        alert("Failed to load data.");
    }
}

// --- UI Rendering ---
function switchTab(tab) {
    currentTab = tab;
    
    document.getElementById('page-title').innerText = tab === 'players' ? 'Manage Players' : 'Manage Teams';
    
    // UI Tab styling
    document.getElementById('tab-players').className = tab === 'players' 
        ? 'px-3 py-2 rounded-md text-sm font-medium bg-blue-900 transition' 
        : 'px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition';
    document.getElementById('tab-teams').className = tab === 'teams' 
        ? 'px-3 py-2 rounded-md text-sm font-medium bg-blue-900 transition' 
        : 'px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition';

    fetchData();
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    currentData.forEach(item => {
        const displayId = currentTab === 'players' ? item.playerId : item.teamId;
        const displayName = currentTab === 'players' ? item.fullName : item.name;
        const dbId = item.id; 

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${displayId}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${displayName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.slug}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="btn-edit text-indigo-600 hover:text-indigo-900 mr-4" data-id="${dbId}">Edit</button>
                <button class="btn-delete text-red-600 hover:text-red-900" data-id="${dbId}" data-display="${displayId}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Attach listeners to newly created buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => editItem(e.target.getAttribute('data-id')));
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteItem(e.target.getAttribute('data-id'), e.target.getAttribute('data-display'));
        });
    });
}

// --- Modal & Form Logic ---
function openModal() {
    isEditMode = false;
    document.getElementById('data-form').reset();
    document.getElementById('internal-id').value = '';
    
    document.getElementById('modal-title').innerText = currentTab === 'players' ? 'Add Player' : 'Add Team';
    document.getElementById('label-unique-id').innerText = currentTab === 'players' ? 'Player ID (e.g., P001)' : 'Team ID (e.g., T001)';
    document.getElementById('label-name').innerText = currentTab === 'players' ? 'Full Name' : 'Team Name';
    
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function editItem(dbId) {
    isEditMode = true;
    const item = currentData.find(x => x.id === dbId);
    
    document.getElementById('internal-id').value = item.id;
    document.getElementById('unique-id').value = currentTab === 'players' ? item.playerId : item.teamId;
    document.getElementById('item-name').value = currentTab === 'players' ? item.fullName : item.name;
    document.getElementById('slug').value = item.slug;

    document.getElementById('modal-title').innerText = currentTab === 'players' ? 'Edit Player' : 'Edit Team';
    document.getElementById('label-unique-id').innerText = currentTab === 'players' ? 'Player ID' : 'Team ID';
    document.getElementById('label-name').innerText = currentTab === 'players' ? 'Full Name' : 'Team Name';

    document.getElementById('modal').classList.remove('hidden');
}

async function deleteItem(dbId, displayId) {
    if (!confirm(`Are you sure you want to delete ${displayId}?`)) return;

    const url = currentTab === 'players' 
        ? `/api/v1/players/${dbId}` 
        : `/api/v1/teams/id/${displayId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            fetchData();
        } else {
            const errorData = await response.json();
            alert("Failed to delete: " + (errorData.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

// --- Event Listeners ---
document.getElementById('tab-players').addEventListener('click', () => switchTab('players'));
document.getElementById('tab-teams').addEventListener('click', () => switchTab('teams'));
document.getElementById('btn-logout').addEventListener('click', logout);
document.getElementById('btn-add-new').addEventListener('click', openModal);
document.getElementById('btn-close-modal').addEventListener('click', closeModal);
document.getElementById('btn-cancel-modal').addEventListener('click', closeModal);

document.getElementById('data-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const uniqueId = document.getElementById('unique-id').value;
    const name = document.getElementById('item-name').value;
    const slug = document.getElementById('slug').value;

    const payload = currentTab === 'players' 
        ? { playerId: uniqueId, fullName: name, slug: slug }
        : { teamId: uniqueId, name: name, slug: slug };

    let url = currentTab === 'players' ? '/api/v1/players' : '/api/v1/teams';
    let method = 'POST';

    if (isEditMode) {
        url = currentTab === 'players' ? `/api/v1/players/id/${uniqueId}` : `/api/v1/teams/id/${uniqueId}`;
        method = 'PUT';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            closeModal();
            fetchData();
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.message || "Something went wrong"));
        }
    } catch (error) {
        console.error("Error saving item:", error);
    }
});

// Initial Load
fetchData();