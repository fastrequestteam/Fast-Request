const { Empresa, Usuario } = require('../models')


exports.ObtenerElIndentificadorDeLaEmpresa = async (req, res) => {
    try {
        const { slug } = req.params;

        const empresa = await Empresa.findOne({
            where: { slug, Estado: "Activo" },
            attributes: [
                "Id",
                "NombreEmpresa",
                "SobreNosotros",
                "SliderImagenes"
            ]
        });

        if (!empresa) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.json({
            empresaId: empresa.Id,
            nombre: empresa.NombreEmpresa,
            sobreNosotros: empresa.SobreNosotros,
            slider: empresa.SliderImagenes,
        });

    } catch (err) {
        console.error('Error al obtener datos públicos de la empresa:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}



exports.ImagenNosotrosEmpresa = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.file || !req.file.path){
            return res.status(400).json({ message: "no se subio ninguna imagen"})
        }

        const empresa = await Empresa.findByPk(id);
        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada"})
        }

        await empresa.update({ SobreNosotros: req.file.path });

        res.json({
            message: "Imagen de Nosotros actualizada correctamente",
            url: req.file.path
        });

    } catch (error) {
        console.error("Error al actualizar imagen:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

exports.AgregarImagenSlider = async (req, res) => {
    try {

        console.log("FILE =>", req.file);
        console.log("PATH =>", req.file?.path);
        const id = req.params.id;

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No se subió ninguna imagen" });
        }

        const empresa = await Empresa.findByPk(id);
        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        // Cloudinary ya subió la imagen, recibimos la URL desde req.file.path
        const nuevaUrl = req.file.path;

        // Clonamos el array actual
        const slider = empresa.SliderImagenes || [];
        slider.push(nuevaUrl);

        await Empresa.update(
            { SliderImagenes: slider },
            { where: { Id: id } }
        );

        res.json({
            message: "Imagen agregada al slider correctamente",
            SliderImagenes: slider
        });

    } catch (error) {
        console.error("Error al agregar imagen al slider:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


exports.EliminarImagenSlider = async (req, res) => {
    try {
        const id = req.params.id;
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: "URL requerida" });
        }

        const empresa = await Empresa.findByPk(id);
        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        const slider = empresa.SliderImagenes || [];

        const nuevoSlider = slider.filter(img => img !== url);

        await empresa.update({ SliderImagenes: nuevoSlider });

        // ❗ OPCIONAL: eliminar la imagen en Cloudinary (solo si quieres)
        try {
            const publicId = url.split("/").slice(-1)[0].split(".")[0];
            await cloudinary.uploader.destroy(publicId);
        } catch (err) {
            console.warn("No se pudo eliminar de Cloudinary (no es grave):", err);
        }

        res.json({
            message: "Imagen eliminada del slider",
            SliderImagenes: nuevoSlider
        });

    } catch (error) {
        console.error("Error al eliminar imagen del slider:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.ObtenerInformarcionEmpresa = async (req, res) => {
     try {
        // ID del usuario autenticado
        const usuarioId = req.user.id;

        // Obtener usuario con su EmpresaId
        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const empresaId = usuario.EmpresaId;

        if (!empresaId) {
            return res.status(400).json({ message: "El usuario no está asociado a ninguna empresa" });
        }

        // Ahora sí, buscar la empresa REAL
        const empresa = await Empresa.findByPk(empresaId, {
            attributes: ["Id", "NombreEmpresa", "SobreNosotros", "SliderImagenes"]
        });

        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        res.json(empresa);

    } catch (error) {
        console.error("Error al obtener datos admin:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
