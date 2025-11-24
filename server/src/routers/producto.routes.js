const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');
const { uploadCloudProductos } = require('../middlewares/upload')


// RUTA PARA PONER LA IMAGEN 
router.put("/productoImagen/:id/imagen", verificarJWT, uploadCloudProductos.single("imagen"), productoController.ActualizarImagenProducto)
router.get("/productos-mas-vendidos", productoController.getProductosMasVendidos);
// RUTAS CRUD BASE
router.get("/", verificarJWT,productoController.VisualizarProductos);
router.post("/", verificarJWT,productoController.CrearProducto);
router.put("/:id", verificarJWT, productoController.ActualizarProducto);
router.delete("/:id", verificarJWT, productoController.EliminarProducto);

// RUTAS CAMBIO DE ESTADO
router.get("/Productos-inactivos", verificarJWT, productoController.VisualizarProductosInactivos);
router.put("/CambiarInactivo/:id", verificarJWT, productoController.CambiarEstadoProductoInactivo);
router.put("/CambiarActivo/:id", verificarJWT, productoController.CambiarEstadoProductoActivo);

// RUTAS PUBLICAS
router.get('/productos', productoController.VisualizarProductosPublicos)

module.exports = router