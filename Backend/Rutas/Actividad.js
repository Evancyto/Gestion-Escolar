const express = require('express');
const router = express.Router();

const actividadController = require('../Controladores/Actividad');

router.get('/actividades', actividadController.consultarActividades);

router.post('/actividades', actividadController.registrarActividad);

router.put('/actividades/:id', actividadController.modificarActividad);

router.delete('/actividades/:id', actividadController.eliminarActividad);

module.exports = router;