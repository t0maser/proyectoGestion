'use strict'

var dbconfig = require('../models/conexion');
const sql = require('mssql')
const jwt = require('jsonwebtoken');

var controller = {
    consultar_tabla: function (req, res) {

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);

            req.query("SELECT * FROM Usuarios ", function (err, resultado1) {
                if (err) return res.status(500).send({ message: "Error al consultar empleado" });
                return res.status(200).send({
                    resultados: resultado1
                })
            });


        });
    },
    getUser: async function (req, res) {
        var user = req.body.usuario;
        var contrasena = req.body.contrasena;

        user = user.toString();
        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT usuario, contrasena, id_usuario, nombre, correo FROM Usuarios WHERE usuario='" + user + "'", function (err, userFind) {
                if (err) return res.status(500).send({ message: "Error al encontrar usuario" });
                if (userFind.recordset[0] == null) return res.status(401).send({ message: "Usuario O Contraseña erronea" });
                if (userFind.recordset[0] != null) {
                    if (((userFind.recordset[0].contrasena).trim()) !== contrasena) return res.status(401).send({ message: "Constraseña erronea" });
                    else {
                        const token = jwt.sign({ id: userFind.recordset[0].id_propietario }, "cañondecerdo");
                        const idUsuario = userFind.recordset[0].id_usuario;
                        const nombre = userFind.recordset[0].nombre;
                        const correo = userFind.recordset[0].correo;
                        return res.status(200).json({
                            token: token, idUsuario, nombre , correo
                        });

                    }
                }


                dbconn.close();
            });
        });
    },

    regUser: function (req, res) {

        let nombre = req.body.nombre;
        let correo = req.body.correo;
        let usuario = req.body.usuario;
        let contrasena = req.body.contrasena;
        let numero = req.body.numero;
        numero = parseInt(numero)
        
        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("INSERT INTO Usuarios (nombre, correo, usuario, contrasena, numero) VALUES ('" + nombre + "', '" + correo + "', '" + usuario + "', '" + contrasena+ "', '" + numero + "' )", function (err, resultado) {
                if (err) console.log(err);
                else {

                    res.status(200).send({
                        resultados: resultado
                    });
                    dbconn.close();
                }
            });
        });
    },
    getAsesor: async function (req, res) {
        var user = req.body.usuario;
        var contrasena = req.body.contrasena;

        user = user.toString();
        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT usuario, contrasena, id_asesor, nombre FROM Asesores WHERE usuario='" + user + "'", function (err, userFind) {
                if (err) return res.status(500).send({ message: "Error al encontrar usuario" });
                if (userFind.recordset[0] == null) return res.status(401).send({ message: "Usuario o Contraseña erronea" });
                if (userFind.recordset[0] !== null) {
                    if (((userFind.recordset[0].contrasena).trim()) !== contrasena) return res.status(401).send({ message: "Constraseña erronea" });
                    else {
                        const token = jwt.sign({ id: userFind.recordset[0].id_propietario }, "cañondecerdo");
                        const idUsuario = userFind.recordset[0].id_asesor;
                        const nombre = userFind.recordset[0].nombre;
                        return res.status(200).json({
                            token: token, idUsuario, nombre
                        });

                    }
                }


                dbconn.close();
            });
        });
    }
};

module.exports = controller;
