document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/turnos")
      .then(res => res.json())
      .then(data => {
        const contenedor = document.getElementById("turnos-container");
  
        if (data.length === 0) {
          contenedor.innerHTML = "<p>No hay turnos registrados.</p>";
          return;
        }
  
        data.forEach(turno => {
          const div = document.createElement("div");
          div.classList.add("turno-item");
          div.innerHTML = `
            <strong>${turno.nombre}</strong><br>
            Servicio: ${turno.servicio}<br>
            Fecha: ${turno.fecha} - Hora: ${turno.hora}<br>
            Contacto: ${turno.email} / ${turno.telefono}
            <hr>
          `;
          contenedor.appendChild(div);
        });
      })
      .catch(error => {
        console.error("Error al cargar turnos:", error);
      });
  });
  
