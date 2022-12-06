
import { verifyToken } from '../middleware/tokens';
import { IAuth } from './../domain/interfaces/IAuth.interface';
import { IUser } from './../domain/interfaces/IUser.interface';
import { Request, Response, Router } from "express";
import { AuthController } from './../controller/AuthController';
import bcrypt from 'bcrypt'

export const authRouter = Router()

// Authorization 
authRouter.route('/register')
    .post(async(req:Request, res:Response) => {
        const {name, email, password, age, katas} = req.body;
        
        if(name && email && password && age && katas){
            //si tengo un pass entonces lo hasheo
            const newUser : IUser = {
                name : name,
                email : email,
                password : bcrypt.hashSync(password, 10),
                age : age,
                katas: katas
            }

            const controller: AuthController = new AuthController();
            const response: any = await controller.userRegister(newUser)

            return res.status(201).json({msg:'User Created', res: newUser})
        }else{
            return res.status(400).send({msg:'User not created'})
        }
    })

    
authRouter.route('/login')
    .post(async(req:Request, res:Response) => {
        const {email, password} = req.body;

        if(email && password){
            //si tengo un pass entonces lo hasheo
            const controller: AuthController = new AuthController();    
           
            const auth : IAuth = {
                email : email,
                password : password
            }

            const response = await controller.userLogin(auth)

            return res.status(200).json({msg:'User Logged Successfull', res: response})
        }else{
            return res.status(400).json({msg:'[ERROR User Data missing]: No user no logged'});
        }
    })


//* PROTEJO RUTAS: uso middleware
// Obtengo Usuario por query
authRouter.route('/userData')
    .get( async(req:Request, res:Response) => {
        const id: any = req?.query?.id

        if(id){
            //si tengo id => instancio el AuthController
            const controller : AuthController = new AuthController();
            //obtengo respuesta
            const response : any = await controller.userData(id)
            
            return res.status(200).json({msg:`User By Id: ${id}`, res: response})
        }else{
            return res.status(401).send({msg: 'You are not authorized'})
        }
    })


    //TODO: LOGOUT