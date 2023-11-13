'use strict'
var express = require('express');

var loginController = require('../controllers/login');

var router = express.Router();


router.get('/consultar', loginController.consultar_tabla);
router.post('/ingresar', loginController.getUser);
router.post('/ingresarA', loginController.getAsesor);
router.post('/registrar', loginController.regUser);

module.exports = router;
