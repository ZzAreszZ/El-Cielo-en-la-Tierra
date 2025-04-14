console.log("Spa Belleza Total cargado correctamente.");

// Esperar a que el documento se cargue
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar el formulario
    const formulario = document.getElementById("turno-form");
  
    // Al enviar el formulario
    formulario.addEventListener("submit", (event) => {
        // Prevenir que se recargue la página
        event.preventDefault();
  
        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const servicio = document.getElementById("servicio").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
  
        // Crear el objeto con los datos del formulario
        const turnoData = { nombre, telefono, email, servicio, fecha, hora };
  
        // Mostrar los datos en la consola para depuración
        console.log("Datos del formulario enviados:", turnoData);
  
        // Enviar los datos al backend con fetch
        fetch("http://localhost:3000/api/turnos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(turnoData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
            } else {
                alert("Ocurrió un error al guardar el turno.");
            }
        })
        .catch((error) => {
            alert("Error al conectar con el servidor.");
        });
  
        // Limpiar el formulario después de enviar
        formulario.reset();
    });
});

  