import { BasicResponse } from './../controller/types/index';
import express, { Express, Request, Response } from 'express';
import { HelloController } from '../controller/HelloControler';
import { LogInfo } from '../utils/loggers';

/**
 * Router de Express
 */
export const helloRouter = express.Router();


/**
 *  http://localhost:8000/api/hello?name=name/
 */
 helloRouter.route('/')
    //GET (por params)->
    .get(async (req: Request, res: Response) => {
        //obtengo el valor de query param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`)
        //instancia del controler
        const controller: HelloController = new HelloController();
        //Obtengo respuesta
        const response : BasicResponse = await controller.getMessage(name);

        //envio al cliente la respuesta
        return res.status(200).send(response)
    })