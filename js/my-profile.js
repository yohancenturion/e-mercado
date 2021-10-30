//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("guardardatos").addEventListener("click", function(e){
        let inputName = document.getElementById("name");
        let inputAge = document.getElementById("age");
        let inputEmail = document.getElementById("email");
        let inputPhone = document.getElementById("phone");

        localStorage.setItem("datosPersonales", JSON.stringify({ name: inputName.value, age: inputAge.value, email: inputEmail.value, phone: inputPhone.value}))
        mostrardatos()
    })
    if (document.getElementById("salir")) {
        document.getElementById("salir").addEventListener("click", function() {
          localStorage.removeItem('datosPersonales');
          window.location = 'index.html';
        })
    }
});

function mostrardatos(){
    let datosPersonales = localStorage.getItem("datosPersonales");
    datosPersonales = JSON.parse(datosPersonales);
    document.getElementById("name").value = datosPersonales.name
    document.getElementById("age").value = datosPersonales.age
    document.getElementById("email").value = datosPersonales.email
    document.getElementById("phone").value = datosPersonales.phone
}
mostrardatos()