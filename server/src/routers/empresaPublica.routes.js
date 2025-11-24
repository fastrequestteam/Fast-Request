const express = require("express");
const router = express.Router();
const empresaPublicaController = require('../controllers/empresaPublic.controller');
const verificarJWT = require("../middlewares/verificarJWT");
const { uploadCloudNosotros, uploadCloudSliders } = require("../middlewares/upload");

// obtener datos publicos de las empresas 
router.get('/empresaPublic/:slug', empresaPublicaController.ObtenerElIndentificadorDeLaEmpresa)

// Agregar imagen a nosotros 
router.put("/NosotrosImagen/:id/imagen", verificarJWT, uploadCloudNosotros.single("imagen"), empresaPublicaController.ImagenNosotrosEmpresa)

// Obtener datos para admin (editar)
router.get("/ObtenerInformarcionEmpresa", verificarJWT, empresaPublicaController.ObtenerInformarcionEmpresa);

// Agregar imagen al slider
router.put("/slider/:id/agregar", verificarJWT, uploadCloudSliders.single("imagen"), empresaPublicaController.AgregarImagenSlider );

// Eliminar imagen del slider
router.delete("/slider/:id/eliminar", verificarJWT, empresaPublicaController.EliminarImagenSlider);

module.exports = router;