'use strict'
var express = require('express');

var asesoriaController = require('../controllers/asesoria');

var router = express.Router();

router.post('/registrarAsesoria', asesoriaController.regAsesoria);
router.get('/asesorias', asesoriaController.consultar_asesorias);
router.post('/asesor/:id', asesoriaController.getAsesor);
router.post('/misAsesoriasUsuario/:id_usuario', asesoriaController.mis_asesorias_usuario);
router.post('/misAsesorias/:id_asesor', asesoriaController.mis_asesorias_asesor);
router.post('/registraruserxasesoria', asesoriaController.regUserxAsesoria);
router.post('/cerrarAsesoria/:id_asesoria', asesoriaController.cerrar_asesoria);
router.post('/usuariosAsesoria/:id_asesoria/:id_asesor', asesoriaController.usuarios_en_asesoria);
router.post('/enviarCorreo', asesoriaController.enviar_correo);

module.exports = router;
