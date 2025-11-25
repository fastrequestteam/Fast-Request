const express = require('express');
const router = express.Router();
const contactanosController = require('../controllers/contactanos.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const { soloAdmin, soloEmpresa } = require('../middlewares/verificarRoles');

// Rutas para que las empresas reciban mensajes de los clientes
router.get('/mensajes', verificarJWT, contactanosController.FindAllMensajesPendientesYVistos);
router.get('/mensajes-archivados', verificarJWT, contactanosController.FindAllMensajesArchivados)
router.post('/enviar-mensaje',  contactanosController.enviarMensageClientes);
router.put('/mensajes-vistos/:id', verificarJWT, contactanosController.actualizarEstadoMensajeVisto);
router.put('/mensajes-archivados/:id', verificarJWT, contactanosController.actualizarEstadoMensajeArchivado);
router.delete('/mensajesDelete/:id', verificarJWT, contactanosController.eliminarMensajesArchivados);


// Rutas para que las empresas envien mensajes a Fast Request
router.post('/enviar-mensaje-empresas', contactanosController.enviarMensajeEmpresas)


module.exports = router;