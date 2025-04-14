const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'spa_db'
});

db.connect(err => {
  if (err) {
    console.log("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL.");
});

// Generar token (Login)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Usuario y contraseña fijos (en producción usar DB)
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username }, "clave_secreta", { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Credenciales inválidas" });
});

// Middleware para validar token
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, "clave_secreta", (err, usuario) => {
    if (err) return res.sendStatus(403);
    req.usuario = usuario;
    next();
  });
}

// Ruta para ver turnos (protegida)
app.get("/api/turnos", verificarToken, (req, res) => {
  db.query("SELECT * FROM turnos", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener turnos" });
    res.json(results);
  });
});

// Ruta para guardar turnos (pública)
app.post("/api/turnos", (req, res) => {
  const { nombre, telefono, email, servicio, fecha, hora } = req.body;
  const query = "INSERT INTO turnos (nombre, telefono, email, servicio, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [nombre, telefono, email, servicio, fecha, hora], (err, result) => {
    if (err) {
      console.log("Error al guardar el turno:", err);
      return res.status(500).json({ error: "No se pudo guardar el turno." });
    }
    res.status(200).json({ message: "Turno registrado exitosamente." });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


