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
    res.send('Welcome to API Restfull Express + Nodemon + TS + Javascript + Mongoose')
})

app.get('/hello', (req: Request, res: Response) => {
    //enviar saludo
    res.send('Hello Lore')
})


/**
 * Puerto donde escucha las request la api
 */
app.listen(port, () => {
    console.log(`Express server: running at http://localhost:${port}`)
})