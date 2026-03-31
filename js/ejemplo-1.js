
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("status-text");
    const btnEnviar = document.getElementById("btnEnviar");

    // 1. Validación en tiempo real (Evento 'blur' o 'input')
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            validarCampo(input);
        });
    });

    function validarCampo(campo) {
        const errorSpan = document.getElementById(`error-${campo.id}`);
        if (!campo.checkValidity()) {
            errorSpan.textContent = campo.validationMessage;
            return false;
        } else {
            errorSpan.textContent = "";
            return true;
        }
    }

    // 2. Simulación de envío con Promesa
    const enviarDatosServidor = (datos) => {
        return new Promise((resolve, reject) => {
            // Simular espera de 2 segundos
            setTimeout(() => {
                // Simulación de error aleatorio (30% de probabilidad de fallo)
                const exito = Math.random() > 0.3;
                if (exito) {
                    resolve("¡Datos enviados con éxito al servidor!");
                } else {
                    reject("Error 500: Fallo en la conexión con el servidor.");
                }
            }, 2000);
        });
    };

    // 3. Manejo del evento 'submit'
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        let formularioValido = true;
        inputs.forEach(input => {
            if (!validarCampo(input)) formularioValido = false;
        });

        if (!formularioValido) return;

        // Estado de carga
        btnEnviar.disabled = true;
        statusText.textContent = "Enviando datos... por favor espere.";
        statusText.className = "loading";

        try {
            const respuesta = await enviarDatosServidor({
                nombre: form.nombre.value,
                email: form.email.value,
                mensaje: form.mensaje.value
            });
            
            // Caso Éxito
            statusText.textContent = respuesta;
            statusText.className = "success";
            form.reset(); // Limpiar formulario
        } catch (error) {
            // Caso Error de Promesa (Rechazo)
            statusText.textContent = error;
            statusText.className = "error";
        } finally {
            btnEnviar.disabled = false;
        }
    });
});