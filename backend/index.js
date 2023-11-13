'use strict'

var app = require('./app');
var port = 3700;

//Creacion del servidor
app.listen(port, () => {
    console.log("Servidor corriendo correctamente en la url: localhost:3700");
});