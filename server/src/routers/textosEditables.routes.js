const express = require("express");
const router = express.Router();
const textosEditablesController = require('../controllers/textosEditables.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

// RUTAS  BASE
router.get("/find-text-edit", verificarJWT, textosEditablesController.getTextos);
router.get('/find-text', textosEditablesController.getTextosPublicos)
router.put('/edit-text/:campo', verificarJWT, textosEditablesController.updateTexto)

module.exports = router;