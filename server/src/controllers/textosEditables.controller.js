const { TextosEditables, Empresa } = require('../models')

exports.getTextos = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;
        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const textos = await TextosEditables.findAll({ where: { EmpresaId: EmpresaId } });
        res.json(textos);

    } catch (err) {
        res.status(500).json({ error: "Error al obtener textos" });
    }
};


exports.getTextosPublicos = async (req, res) => {
    try {

        const { empresaId } = req.query

        if (!empresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const empresa = await Empresa.findByPk(empresaId);

        if (!empresa || empresa.Estado !== "Activo") {
            return res.status(404).json({ error: "Empresa no encontrada o inactiva" });
        }

        const textos = await TextosEditables.findAll({ where: { EmpresaId: empresaId } });
        res.json(textos);

    } catch (err) {
        res.status(500).json({ error: "Error al obtener textos" });
    }
};

exports.updateTexto = async (req, res) => {
    const { campo } = req.params;
    const { valor } = req.body;

    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }


        let texto = await TextosEditables.findOne({
            where: { campo, EmpresaId }
        });


        if (!texto) {
            texto = await TextosEditables.create({
                campo,
                valor,
                EmpresaId
            });

            return res.json({
                message: "Creado exitosamente",
                texto
            });
        }


        if (texto.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }


        texto.valor = valor;
        await texto.save();

        return res.json({
            message: "Actualizado correctamente",
            texto
        });

    } catch (error) {
        console.error("Error updateTexto:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
