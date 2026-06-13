async function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        "https://volley-api.vercel.app/api/v1/admin/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );

    const data = await response.json();

    if(data.token){

        localStorage.setItem(
            "token",
            data.token
        );

        window.location.href =
            "/dashboard";

    }else{

        document.getElementById(
            "message"
        ).innerText =
            data.message || "Login Failed";

    }

}