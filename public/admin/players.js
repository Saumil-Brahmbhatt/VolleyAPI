const token = localStorage.getItem("token");

if(!token){
    window.location.href = "login.html";
}

function logout(){

    localStorage.removeItem("token");

    window.location.href = "login.html";
}

async function loadPlayers(){

    const response = await fetch(
        "https://volley-api.vercel.app/api/v1/players"
    );

    const players = await response.json();

    const container =
        document.getElementById(
            "playersContainer"
        );

    container.innerHTML = "";

    players.forEach(player => {

        container.innerHTML += `
            <div class="player-card">

                <h3>${player.fullName}</h3>

                <p>
                    ${player.position}
                </p>

                <p>
                    ${player.nationality}
                </p>

                <button
                    onclick="deletePlayer('${player.id}')"
                >
                    Delete
                </button>

            </div>
        `;

    });

}

async function deletePlayer(id){

    const confirmed =
        confirm(
            "Delete this player?"
        );

    if(!confirmed) return;

    const response = await fetch(
        `https://volley-api.vercel.app/api/v1/players/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    const data =
        await response.json();

    alert(data.message);

    loadPlayers();

}

loadPlayers();