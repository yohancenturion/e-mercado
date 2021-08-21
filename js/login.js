//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    
    document.getElementById("submitBtn").addEventListener("click", function(e) {
        
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let Camposcompletos = true;

        if(inputEmail.value==='') {
            Camposcompletos = false;
            inputEmail.classList.add("invalid");
        } else {
            inputEmail.classList.remove("invalid")
        }

        if(inputPassword.value===''){
            inputPassword.classList.add("invalid");
            Camposcompletos = false;
        } else {
            inputPassword.classList.remove("invalid");
    }
    if (Camposcompletos) {
        window.location="inicio.html";
    } else { alert ("Debe ingresar los datos"); }
    })
    

});