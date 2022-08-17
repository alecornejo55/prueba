document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById("formLogin");
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = new FormData(formLogin);
        const data = {
            username: form.get('username'),
            password: form.get('password')
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        // console.log(data);
        const response = await fetch(`/api/user/login`, options);
        const result = await response.json();
        const divError = document.getElementById("errMsg");
        if(result.status === 'error') {
            divError.innerHTML = "";
            result.message.forEach(element => {
                divError.innerHTML += `<p class="m-0">${element}</p>`;                
            });
            divError.className = "alert alert-danger py-2";
        }
        else {
            divError.innerHTML = "";
            divError.className = "";
            window.location.href = "/dashboard";
        }
        // console.log(result);
    });
});