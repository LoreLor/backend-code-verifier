import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';


/**
 * Configuracion de archivo .env
 */
dotenv.config();


/**
 * App con instancia express
 */
const app: Express = express();
const port: string | number = process.env.PORT || 8000


/**
 * Ruta general
 */
app.get('/', (req: Request, res: Response) => {
    //enviar saludo
    res.status(200).json({
        "data": {
            "message":"Goodbye, world"
        }
    })
})

app.get('/hello', (req:Request, res:Response) => {
    let name: any = req?.query?.name
    
    res.status(200).json({
        "data": {
            "message": `Hola ${name || 'guess'}`
        }
    })
})



/**
 * Puerto donde escucha las request la api
 */
app.listen(port, () => {
    console.log(`Express server: running at http://localhost:${port}`)
})