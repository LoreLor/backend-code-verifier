import { IKata, KataLevel } from './../domain/interfaces/IKata.interface';
import { kataEntity } from './../domain/entities/Katas.entity';
import { KatasController } from './../controller/KatasController';
import { Request, Response, Router } from "express";


export const kataRouter = Router();

kataRouter.route('/')
    .get(async(req:Request, res:Response) => {

        //instancio kata controller to execute method
        const controller: KatasController = new KatasController();
        // obtain response whit method
        const response: any = await controller.getKatas()
        // send response to client
        return res.status(200).send(response);
    })

    .get(async(req:Request, res:Response) => {
        const {id} = req.params
        const controller : KatasController = new KatasController();
        const response : any = await controller.getKataById(id)
        return res.status(200).send(response)
    })

    .post(async(req:Request, res:Response) => {
        // read from body
        let name:string = req?.body?.name;
        let description:string = req?.body?.description;
        let level:KataLevel = req?.body?.level;
        let intents:number = req?.body?.intents;
        let stars:number = req?.body?.stars;
        let creator:string = req?.body?.creator;
        let solution:string = req?.body?.solution;
        let participants:string[] = req?.body?.participants;

        //controller instance
        const controller: KatasController = new KatasController();
        const newKata: IKata = {
            name:name,
            description:description,
            level:level,
            intents:intents,
            stars:stars,
            creator:creator,
            solution:solution,
            participants:participants,
        }

        const response: any = await controller.kataCreate(newKata)
        return res.status(201).send(response)


    })