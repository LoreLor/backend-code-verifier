import { goodbyeRouter } from './GoodbyeRouter';
import { LogInfo } from '../utils/loggers';
import express, {Request, Response, Router} from 'express'
import { helloRouter } from './HelloRouter';

//servicio
const server = express();

//instancia de Router
const router = Router();


//se activan para request a http://localhost:8000/api
//GET ->
router.get('/', (req:Request, res:Response) => {
    LogInfo('GET: http://localhost:8000/api/')
    res.status(200).send('Bienvenidos a mi api')
})

//redirecciones a routers y controladores
server.use('/', router );
server.use('/hello', helloRouter)
//add more routes
server.use('/goodbye', goodbyeRouter)

export default server;