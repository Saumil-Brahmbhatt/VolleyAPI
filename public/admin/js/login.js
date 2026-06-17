document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    
    try {
        const response = await fetch('/api/v1/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('adminToken', data.token);
            window.location.href = '/admin/dashboard';
        } else {
            errorDiv.textContent = data.message || 'Login failed';
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        errorDiv.textContent = 'Server connection error';
        errorDiv.classList.remove('hidden');
    }
});