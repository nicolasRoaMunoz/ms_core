import express from 'express';
import { ErrorRequestHandler } from 'express';

import parseUrl from 'parseurl';

import logger from './utils/logger'

import usuarioRoute from './routes/cuentas';
import cuentaRoute from './routes/cuentas';
import entidadFinancieraRoute from './routes/cuentas';
import nivelRiesgoRoute from './routes/cuentas';
import muestraRoute from './routes/cuentas';
import reporteRoute from './routes/cuentas';


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;

    if (process.env.NODE_ENV === 'development') {
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
        });
    } else {
        res.status(statusCode).json({
            message: 'Internal server error',
        });
    }
};

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (req, res, next) => {
    console.log('Esto funciona');
    res.send('pong');
})

app.use((req, res, next) => {
    const origen = parseUrl(req);
    logger.info(`${req.method}: ${origen?.pathname}`)
    next();
})

app.use('/api/administracion/usuario', usuarioRoute);

app.use('/api/configuracion/cuenta', cuentaRoute);
app.use('/api/configuracion/entidadFinanciera', entidadFinancieraRoute);
app.use('/api/configuracion/nivelRiesgo', nivelRiesgoRoute);

app.use('/api/muestra', muestraRoute);
app.use('/api/reporte', reporteRoute);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
})
