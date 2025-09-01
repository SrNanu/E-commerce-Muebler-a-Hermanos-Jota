let inputName = document.getElementById("inputName");
let inputEmail = document.getElementById("inputEmail");
let inputMessage = document.getElementById("inputMessage");
let confirmButton = document.getElementById("confirmButton");

confirmButton.addEventListener("click", function(event) {
    event.preventDefault();

    let name = inputName.value.trim();
    let email = inputEmail.value.trim();
    let message = inputMessage.value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    alert("Formulario enviado con éxito.");

});