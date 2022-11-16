import { Request, Response, Router } from "express";

import { KatasController } from './../controller/KatasController';


export const kataRouter = Router();

kataRouter.route('/')
    .get(async(req:Request, res:Response) => {
        const level: any = req?.query?.level ;
        const page: any = req?.query?.page || 1;
        const limit: any = req?.query?.limit || 10

        if(level){
            const controller: KatasController = new KatasController();

            const response: any = await controller.getKataByLevel(page, limit, level)

            return res.status(200).json({msg:`Kata By Level: ${level}`, res:response})
        }else{
            //instancio kata controller to execute method
            const controller: KatasController = new KatasController();
            // obtain response whit method
            const response: any = await controller.getKatas(page, limit)
            // send response to client
            return res.status(200).send(response);
        }
    })


    
    .post(async(req:Request, res:Response) => {
        // read from body
        let name:string = req?.body?.name;
        let description:string = req?.body?.description;
        let level: number = req?.body?.level;
        let intents:number = req?.body?.intents;
        let stars:number = req?.body?.stars;
        let creator:string = req?.body?.creator;
        let solution:string = req?.body?.solution;
        let participants:string = req?.body?.participants;

        const newKata: any = {
            name:name,
            description:description,
            level:level,
            intents:intents,
            stars:stars,
            creator:creator,
            solution:solution,
            participants:participants,
        }
        //controller instance
        const controller: KatasController = new KatasController();

        const response: any = await controller.kataCreate(newKata)
        
        return res.status(201).json({msg:`Kata create successfull: ${newKata}`})
    })

    
    kataRouter.route('/:id')
    .get(async(req:Request, res:Response) => {
        const {id}= req.params;
      

        const controller : KatasController = new KatasController();
        
        const response : any = await controller.getKataById(id)
        
        return res.status(200).send(response)
    })
    

    .put(async(req:Request, res:Response) => {
        // read from body
        let id: string = req?.params?.id;
        let name:string = req?.body?.name;
        let description:string = req?.body?.description;
        let level: number = req?.body?.level;
        let intents:number = req?.body?.intents;
        let stars:number = req?.body?.stars;
        let creator:string = req?.body?.creator;
        let solution:string = req?.body?.solution;
        let participants:string = req?.body?.participants;

        const updateKata: any = {
            name:name,
            description:description,
            level:level,
            intents:intents,
            stars:stars,
            creator:creator,
            solution:solution,
            participants:participants,
        }
        
        const controller :KatasController = new KatasController();
        
        const response: any = await controller.kataUpdate(id, updateKata)
        
        return res.status(201).json({msg:'Kata successfull update', updateKata})
    })
    

    .delete(async(req:Request, res:Response) => {
        let id : string = req.params.id;

        const controller: KatasController = new KatasController();
        
        const response: any = await controller.kataDelete(id)
        
        return res.status(200).json({msg:`Kata Delete Successfull: ${id}`, })
    })