const cleave = new Cleave('.input-element', {
    phone: true,
    phoneRegionCode: 'ar'
});

document.addEventListener('DOMContentLoaded', function() {
    const formSignUp = document.getElementById("formSignUp");
    
    formSignUp.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const response = await fetch(`/api/user/signUp`, {
          method: "POST",
          body: form,
        });
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
            window.location.href = "/login";
        }
        // console.log(result);
    });
});