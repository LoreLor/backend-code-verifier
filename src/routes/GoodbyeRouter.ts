import { GoodbyeController } from './../controller/GoodbyeController';
import { LogInfo } from './../utils/loggers';
import { Request, Response, Router } from "express";


export const goodbyeRouter = Router();

goodbyeRouter.route('/')
    .get(async(req:Request, res:Response) => {
        let name: any = req?.query?.name
        LogInfo(`Query Param: ${name}`)

        const controller : GoodbyeController = new GoodbyeController();

        const response = await controller.getMessage(name);

        return res.status(200).send(response)
    })
