import { LogInfo } from './../utils/loggers';
import { UserController } from './../controller/UserController';
import { Request, Response, Router } from 'express';


export const userRouter = Router()

userRouter.route('/')
    .get(async(req: Request, res: Response) => {
        //obtain a query param (id)
        const id: any = req?.query?.id
        //controller instace to execute method
        const controller: UserController = new UserController();
        //obtain response
        const response: any = await controller.getUsers(id)
        //send to client 
        return res.status(200).send(response)
    })

    .delete(async(req:Request, res:Response) => {
        const id:any = req?.query?.id

        const controller: UserController = new UserController();

        const response: any = await controller.deleteUser(id)
        return res.status(200).send(response)
    })


    .post(async(req:Request, res:Response) => {

        let name: string = req?.body?.name;
        let email: string = req?.body?.email;
        let age: number = req?.body?.age;
        LogInfo(`Bodys: ${name}, ${age}, ${email}`);

       
        const controller: UserController = new UserController();
        const user = {
            name:name,
            email:email,
            age:age
        }

        const response: any = await controller.createUser(user)
        return res.status(201).send(response)
    })

    .put(async(req:Request, res:Response) => {
        
        let id : any = req?.query?.id;
        let name: string = req?.body?.name;
        let email: string = req?.body?.email;
        let age: number = req?.body?.age;
        LogInfo(`Bodys: ${name}, ${age}, ${email}`);

       
        const controller: UserController = new UserController();
        const user = {
            name:name,
            email:email,
            age:age
        }

        const response: any = await controller.updateUser(id, user);

        return res.status(201).send(response);
    })
