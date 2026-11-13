const actividadModel = require('../Modelos/Actividad');
async function registrarActividad(req, res) {

    try {
        const nombre = req.body.nombre;
        const materia = req.body.materia;
        const prioridad = req.body.prioridad;

        if (
            !nombre || !nombre.trim() ||
            !materia || !materia.trim() ||
            !prioridad
        ) {
            return res.status(400).send('Completa todos los campos');
        }

        const id = await actividadModel.registrarActividad(
            nombre.trim(),
            materia.trim(),
            prioridad
        );

        res.status(201).json({
            mensaje: 'Actividad registrada correctamente',
            id: id
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar la actividad');
    }
}
async function consultarActividades(req, res) {

    try {
        const actividades = await actividadModel.consultarActividades();

        res.json(actividades);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar actividades');
    }
}
async function modificarActividad(req, res) {

    try {
        const id = Number(req.params.id);
        const estado = req.body.estado;

        const estadosPermitidos = [
            'Pendiente',
            'En proceso',
            'Completada'
        ];

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).send('ID inválido');
        }

        if (!estadosPermitidos.includes(estado)) {
            return res.status(400).send('Estado inválido');
        }

        const resultado = await actividadModel.modificarActividad(
            id,
            estado
        );

        if (resultado === 0) {
            return res.status(404).send('Actividad no encontrada');
        }

        res.json({
            mensaje: 'Estado actualizado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al modificar la actividad');
    }
}
async function eliminarActividad(req, res) {

    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).send('ID inválido');
        }

        const resultado = await actividadModel.eliminarActividad(id);

        if (resultado === 0) {
            return res.status(404).send('Actividad no encontrada');
        }

        res.json({
            mensaje: 'Actividad eliminada correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la actividad');
    }
}
module.exports = {
    registrarActividad,
    consultarActividades,
    modificarActividad,
    eliminarActividad
};