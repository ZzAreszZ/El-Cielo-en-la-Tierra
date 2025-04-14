document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("¡Bienvenido!");
          // ✅ Redirecciona al listado de turnos si login exitoso
          window.location.href = "verTurnos.html";
        } else {
          alert("Credenciales inválidas.");
        }
      })
      .catch(() => alert("Error al conectar con el servidor."));
  });
  