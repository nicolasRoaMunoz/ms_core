import express from 'express';
const route = express();

const obtenerCuentas = require('./cuenta/listar.service').operation;
const obtenerCuenta = require('./repositorio/cuenta/obtener/controller').operation;
const editarCuenta = require('./repositorio/cuenta/editar/controller').operation;
const crearCuenta = require('./repositorio/cuenta/crear/controller').operation;

route.get('/msnico/cuentas', async (req, res, next) => {
    obtenerCuentas()
        .then((result) => {
            res.status(result.status).send({
                message: result.message,
                data: result.data,
            });
        })
        .catch((error) => {
            next(error);
        });
});

route.get('/msnico/cuenta', async (req, res, next) => {
    obtenerCuenta()
        .then((result) => {
            res.status(result.status).send({
                message: result.message,
                data: result.data,
            });
        })
        .catch((error) => {
            next(error);
        });
});

route.put('/msnico/cuenta', async (req, res, next) => {
    editarCuenta()
        .then((result) => {
            res.status(result.status).send({
                message: result.message,
                data: result.data,
            });
        })
        .catch((error) => {
            next(error);
        });
});

route.post('/msnico/cuenta', async (req, res, next) => {
    const { nombre, idEntidad, idRiesgo } = req.body;
    crearCuenta(nombre, idEntidad, idRiesgo)
        .then((result) => {
            res.status(result.status).send({
                message: result.message,
                data: result.data,
            });
        })
        .catch((error) => {
            next(error);
        });
});