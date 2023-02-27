import  fileUpload  from 'express-fileupload';
import express, {Express, Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';



//seguridad
import cors from 'cors';
import helmet from 'helmet';


// TODO: HTTPS
import router from '../routes';
import mongoose from 'mongoose';




//creacion server app- express  app || server
const server:Express = express();
server.use(express.json());


// enable files upload
server.use(fileUpload());



const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

server.use(cors(options));

// * Swagger: configuracion de ruta 
server.use('/docs', 
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
)



//*definir server que use /api y que use router
// *lo que tendremos sera: http://localhost:8000/api/.... 
server.use('/api', router)


//* server estatico 
server.use(express.static('public'))

//* Mongoose Connection
mongoose.connect('mongodb://localhost:27017/code-verified')
.then(res => console.log(`estoy conectada a bd`))



//* security config
server.use(helmet());
//server.use(cors())

//* contenido que va a controlar: Content Type
server.use(express.urlencoded({extended: true, limit:'50mb'}))
server.use(express.json({limit:'50mb'}));


//* redireccion a raiz de api: para evitar que devuelva rutas vacias
server.get('/', (req:Request, res:Response) => {
    res.redirect('/api')
})


export default server;