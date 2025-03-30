'use strict'

var dbconfig = require('../models/conexion');
const sql = require('mssql')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var controller = {

    // Controlador para consultar asesorias 
    consultar_asesorias: function (req, res) {

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);

            req.query("SELECT * FROM Asesorias WHERE activo <> 0 ", function (err, asesorias) {
                if (err) return res.status(500).send({ message: "Error al consultar asesorias..." });
                return res.status(200).send({
                    resultados: asesorias
                })
            });


        });
    },
    cerrar_asesoria: function (req, res) {

        let id_asesoria = req.params.id_asesoria

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);

            req.query("UPDATE Asesorias SET activo = 0 WHERE id_asesoria ='" + id_asesoria + "'", function (err, response) {
                if (err) return res.status(500).send({ message: "Error al cerrar asesoria..." });
                if (res.status(200)) {
                    req.query("UPDATE asesorXasesoriaXusuario SET activo = 0 WHERE id_asesoria ='" + id_asesoria + "'", function (err, response) {
                        if (err) return res.status(500).send({ message: "Error al cerrar asesoria..." });
                        return res.status(200).send({
                            resultados: response
                        })
                    });
                }

            });


        });
    },
    mis_asesorias_usuario: function (req, res) {

        let id_usuario = req.params.id_usuario

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);

            req.query("SELECT a.id_usuario, b.*  FROM asesorXasesoriaXusuario a, Asesorias b " +
                "WHERE a.id_asesoria = b.id_asesoria AND a.activo <> 0 AND b.activo <> 0 AND a.id_usuario='" + id_usuario + "'", function (err, asesorias) {
                    if (err) return res.status(500).send({ message: "Error al consultar asesorias..." });
                    return res.status(200).send({
                        resultados: asesorias
                    })
                });


        });
    },
    enviar_correo: function (req, res) {

        let correo_asesor = 'tomasecheverrir@gmail.com'
        let password = 'bzvngkjtwvtmhelv'
        let correo_usuario = req.body.correoUsuario
        let fecha = req.body.fecha
        let nombre = req.body.nombre

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: correo_asesor,
                pass: password 
            }
        });
        let mailOptions = {
            from: correo_asesor, 
            to: correo_usuario, 
            subject: 'Inscripcion en asesoria TQS',
            text: 'Se ha inscrito en la asesoria de '+nombre.trim() +', Dia y hora de la asesoria : '+fecha
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return res.status(505).send({message : error})
              
            } else {
                return res.status(200).send({message : info.response})            
            }
          });
    },
    mis_asesorias_asesor: function (req, res) {

        let id_asesor = req.params.id_asesor

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);

            req.query("SELECT *  FROM  Asesorias " +
                "WHERE activo <> 0 AND id_asesor='" + id_asesor + "'", function (err, asesorias) {
                    if (err) return res.status(500).send({ message: "Error al consultar asesorias..." });
                    return res.status(200).send({
                        resultados: asesorias
                    })
                });


        });
    },
    usuarios_en_asesoria: function (req, res) {

        let id_asesor = req.params.id_asesor
        let id_asesoria = req.params.id_asesoria

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);

            req.query("SELECT a.*, u.*  FROM  asesorXasesoriaXusuario a , Usuarios u " +
                "WHERE a.activo <> 0 AND a.id_usuario = u.id_usuario AND id_asesor='" + id_asesor + "' AND id_asesoria='" + id_asesoria + "'", function (err, usuarios) {
                    if (err) return res.status(500).send({ message: "Error al consultar usuarios..." });
                    return res.status(200).send({
                        resultados: usuarios
                    })
                });


        });
    },

    regAsesoria: function (req, res) {

        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion;
        let valor = req.body.valor;
        valor = parseInt(valor)
        let id_asesor = req.body.id_asesor;
        id_asesor = parseInt(id_asesor)
        let cupo = req.body.cupo;
        cupo = parseInt(cupo)
        let lugar = req.body.lugar;
        let fecha = req.body.fecha;

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("INSERT INTO Asesorias (nombre, descripcion, valor, id_asesor, cupo, lugar, fechaA, activo)" +
                "VALUES ('" + nombre + "', '" + descripcion + "', '" + valor + "', '" + id_asesor + "', '" + cupo + "', '" + lugar + "', '" + fecha + "',1 )", function (err, resultado) {
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
        var id = req.params.id;

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);
            req.query("SELECT usuario, contrasena, id_asesor, nombre, imagen FROM Asesores WHERE id_asesor='" + id + "'", function (err, userFind) {
                if (err) return res.status(500).send({ message: "Error al encontrar usuario" });
                if (userFind.recordset[0] !== null) {
                    return res.status(200).json({
                        resultados: userFind
                    });

                }
                dbconn.close();
            });
        });
    },
    regUserxAsesoria: function (req, res) {

        let id_asesor = req.body.id_asesor;
        let id_usuario = req.body.id_usuario;
        let id_asesoria = req.body.id_asesoria;

        var dbconn = new sql.ConnectionPool(dbconfig);
        dbconn.connect(function (err) {
            if (err) throw err;
            var req = new sql.Request(dbconn);

            req.query("SELECT * FROM asesorXasesoriaXusuario WHERE id_asesoria ='" + id_asesoria + "' AND id_usuario ='" + id_usuario + "'", function (err, resultado) {

                if (resultado.recordset[0] != null) {
                    res.status(401).send({ message: "Usuario ya esta registrado en la asesoria" });
                } else {
                    req.query("INSERT INTO asesorXasesoriaXusuario (id_asesor, id_usuario, id_asesoria, activo) VALUES ('" + id_asesor + "', '" + id_usuario + "','" + id_asesoria + "',1)", function (err, resultado) {
                        if (err) console.log(err);
                        else {
                            req.query("UPDATE Asesorias SET cupo = cupo - 1 WHERE id_asesoria ='" + id_asesoria + "'", function (err, resultado) {
                                if (err) console.log(err);
                                else {

                                    res.status(200).send({
                                        resultados: resultado
                                    });
                                    dbconn.close();
                                }
                            });

                        }
                    });
                }


            });

        });
    }

};

module.exports = controller;
