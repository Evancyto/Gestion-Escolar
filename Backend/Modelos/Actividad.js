const conexion = require('../Config/database');
async function registrarActividad(nombre, materia, prioridad) {

    const db = await conexion();

    try {
        const sql = `
            INSERT INTO actividades (nombre, materia, prioridad)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.execute(sql, [
            nombre,
            materia,
            prioridad
        ]);

        return resultado.insertId;

    } finally {
        await db.end();
    }
}
async function consultarActividades() {

    const db = await conexion();

    try {
        const sql = 'SELECT * FROM actividades';

        const [resultados] = await db.execute(sql);

        return resultados;

    } finally {
        await db.end();
    }
}
async function modificarActividad(id, estado) {

    const db = await conexion();

    try {
        const sql = `
            UPDATE actividades
            SET estado = ?
            WHERE id = ?
        `;

        const [resultado] = await db.execute(sql, [
            estado,
            id
        ]);

        return resultado.affectedRows;

    } finally {
        await db.end();
    }
}
async function eliminarActividad(id) {

    const db = await conexion();

    try {
        const sql = `
            DELETE FROM actividades
            WHERE id = ?
        `;

        const [resultado] = await db.execute(sql, [id]);

        return resultado.affectedRows;

    } finally {
        await db.end();
    }
}
module.exports = {
    registrarActividad,
    consultarActividades,
    modificarActividad,
    eliminarActividad
};