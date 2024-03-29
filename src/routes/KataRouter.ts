
import { verifyToken } from './../middleware/tokens';
import { IKata, KataLevel } from './../domain/interfaces/IKata.interface';
import { Request, Response, Router } from "express";

import { KatasController } from './../controller/KatasController';



export const kataRouter = Router();

kataRouter.route('/')
    .get(verifyToken, async(req:Request, res:Response) => {
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


    
    .post(verifyToken, async(req:Request, res:Response) => {
        // read from body
        let name:string = req?.body?.name;
        let description:string = req?.body?.description || 'Default Description';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents:number = req?.body?.intents || 0;
        let stars:number = req?.body?.stars || 0;
        let creator:string = req.body.creator;
        let solution:string = req?.body?.solution || 'Default Solution';
        let participants:string[] = req?.body?.participants || [];

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

        console.log(newKata)
        //controller instance
        const controller: KatasController = new KatasController();

        const response: any = await controller.kataCreate(newKata)
        
        return res.status(201).json({msg:`Kata create successfull`, res: newKata})
    })
//podria hacer un if-else para control
    


    kataRouter.route('/:id')
    .get(verifyToken, async(req:Request, res:Response) => {
        const {id}= req.params;

        const controller : KatasController = new KatasController();
        
        const response : any = await controller.getKataById(id)
        
        return res.status(200).send(response)
    })
    

    .put(verifyToken, async(req:Request, res:Response) => {
        // read from body
        let id: string = req?.params?.id;
        let name:string = req?.body?.name;
        let description:string = req?.body?.description;
        let level: KataLevel = req?.body?.level;
        let intents:number = req?.body?.intents;
        let stars:number = req?.body?.stars;
        let creator:string = req?.body?.creator;
        let solution:string = req?.body?.solution;
        let participants:string[] = req?.body?.participants;

     //dstructuring const {...props} = req.body || const {name, description, etc}=req.body

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
    

    .delete(verifyToken, async(req:Request, res:Response) => {
        let id : string = req.params.id;

        const controller: KatasController = new KatasController();
        
        const response: any = await controller.kataDelete(id)
        
        return res.status(200).json({msg:`Kata Delete Successfull: ${id}`, })
    })


//TODO: no funciona
    kataRouter.route('/uploadFile')
    .post(verifyToken, async(req:any, res:any) => {
        let files: any = req?.body?.files;
        console.log('req', req)

        try {
            if (!req.files) {            
                res.status(400).send({
                status: false,
                message: "No file uploaded",
                payload: {},
              });

            } else {
                //Use the name of the input field (i.e. "file") to retrieve the uploaded file
                let file = files.file;
                file.mv("./uploads/" + file.name);
                //send response
                res.send({
                status: true,
                message: "File was uploaded successfully",
                payload: {
                    name: file.name,
                    mimetype: file.mimetype,
                    path: "/files/uploads/",
                },
                });
            }
        } catch (err) {
            res.status(500).send({
                status: false,
                message: "Unspected problem",
                payload: {},
            });
        }
    });
    
    