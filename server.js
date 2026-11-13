const express = require('express');
const path = require('path');

const actividadRoutes = require('./Backend/Rutas/Actividad');

const app = express();

// Configuración para recibir información
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del frontend
app.use(express.static(path.join(__dirname, 'Frontend')));

// Conectar las rutas
app.use(actividadRoutes);

// Mostrar la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'Paginas', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});