// js/contacto.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMensaje = document.getElementById('form-mensaje');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (nombre === '' || email === '' || mensaje === '') {
                mostrarMensaje('Por favor, completa todos los campos.', 'error');
                return;
            }

            // Validación simple de email
            if (!validarEmail(email)) {
                mostrarMensaje('Por favor, introduce un correo electrónico válido.', 'error');
                return;
            }

            // Si todo está bien, mostramos mensaje de éxito
            mostrarMensaje('¡Mensaje enviado con éxito!', 'exito');
            contactForm.reset(); // Limpiamos el formulario
        });
    }

    function mostrarMensaje(texto, tipo) {
        formMensaje.textContent = texto;
        formMensaje.className = `form-mensaje ${tipo}`; // Asigna clase para estilo CSS
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            formMensaje.textContent = '';
            formMensaje.className = 'form-mensaje';
        }, 3000);
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});