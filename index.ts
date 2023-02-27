
import { LogSuccess, LogError } from './src/utils/loggers';
import dotenv from 'dotenv';
import server from './src/server/index'

//configuracion .env
dotenv.config();

const port = process.env.PORT || 8000;


/**
 * *Puerto donde escucha las request la api
 */
server.listen(port, () => {
    LogSuccess(`[SERVER ON]: running at http://localhost:${port}/api`)
    
})

/**
 * *Control de errores para el servidor
 */
server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error} `)
})