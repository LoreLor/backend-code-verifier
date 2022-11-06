import express, {Express, Request, Response} from 'express';


//seguridad
import cors from 'cors';
import helmet from 'helmet';


// TODO: HTTPS
import router from '../routes';



//creacion server app- express  app || server
const server:Express = express();



//*definir server que use /api y que use router
// *lo que tendremos sera: http://localhost:8000/api/.... 
server.use('/api', router)


//* server estatico 
server.use(express.static('public'))

// TODO: Mongoose Connection


//* security config
server.use(helmet());
server.use(cors());


//* contenido que va a controlar: Content Type
server.use(express.urlencoded({extended: true, limit:'50mb'}))
server.use(express.json({limit:'50mb'}));


//* redireccion a raiz de api: para evitar que devuelva rutas vacias
server.get('/', (req:Request, res:Response) => {
    res.redirect('/api')
})


export default server;