import { getKatas } from './Katas.orm';
import { IKata } from './../interfaces/IKata.interface';
import { kataEntity } from './../entities/Katas.entity';
import { generateToken } from './../../middleware/tokens';
import { IUser } from './../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';

import { LogError, LogWarning } from './../../utils/loggers';
import { userEntity } from "../entities/User.entity";


import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

//Peticiones CRUD


/**
 * Metodo para obtener todos los Usuarios de la coleccion de Mongo
 */
export const getAllUsers = async (page:number, limit:number): Promise<any> => {
    try {
        //me traigo el modelo
        const userModel = userEntity();

        let response: any = {};

        //cuento los documentos de la coleccion -PAGINADO
        const total = await userModel.countDocuments()
        response.totalPage = Math.ceil(total / limit)
        response.currentPage = page;


        //busco todos los usuarios: me devuelve todos los campos menos la pass
        const users = await userModel.find({ isDeleted: false })
                        //.select('name email age')tambien se puede seleccionar campos asi
                        .limit(limit)
                        .skip((page -1) * limit) //elementos por pagina
                        .exec()                 //permite ejecutar la consulta
        response.users = users
                        
        //podria gestionar tambien con un forEach para que no venga el password
        // users.forEach((user: IUser) => {
        //       user.password = ""
            
        return response

    } catch (error) {
        LogError(`[ORM ERROR]: ${error}`)
    }
}

// GET USER BY ID

export const getUserById = async (id: String): Promise<any> => {
    try {
        const userModel = userEntity();  //me traigo el modelo

        const response = await userModel.findById(id).select('_id name email age katas')  //busco por id
                            
        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Get User By Id: ${error}`)
    }
}

// DELETE USER BY ID
export const deleteUserById = async (id: string): Promise<any> => {
    try {
        const userModel = userEntity();

        const response = await userModel.deleteOne({ _id: id });

        return response;
    } catch (error) {
        LogError(`[ORM ERROR] Delete user by Id: ${error}`)
    }
}


// CREATE USER - REGISTER
export const createUser = async(user: any): Promise<any> => {

    try {
        const userModel = userEntity();

        const response = await userModel.create(user);

        return response

    } catch (error) {
        LogError(`[ORM ERROR] Create User: ${error}`)
    }
}

// UPDATE USER
export const updateUser = async (id: string, user: any): Promise<any> => {
    try {
        const userModel = userEntity();

        const response = await userModel.findByIdAndUpdate(id, user)

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
}



// REGISTER USER
export const userRegister = async (user: IUser): Promise<any> => {
    try {
        const userModel = userEntity();

        const response = await userModel.create(user)

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Registered User ${user}: ${error}`);
    }
}


// LOGIN USER
export const userLogin = async (auth: IAuth): Promise<any> => {
    try {
        const userModel = userEntity();

        //valido existencia de usuario buscando el email
        const user = await userModel.findOne({ email: auth.email })
        if (!user) {
            LogError(`[ERROR Authentication in ORM]: User Not Found: ${user}`);

        }
        //comparo las contraseñas: guardada e ingresada
        const validPassword = bcrypt.compareSync(auth.password, user.password)

        if (!validPassword) {
            LogWarning(`[ERROR Authentication in ORM]: Password Not Valid`);
            throw new Error(`[ERROR Authentication in ORM]: Password Not Valid`);

        }

        //creo el jwt
        const token = generateToken(user)

        return {
            user: user,
            token: token
        }

    } catch (error) {
        LogError(`[ORM ERROR]: Login User : ${error}`);
    }
}

export const userData = async (id: String): Promise<any> => {
    try {
        const userModel = userEntity();  //me traigo el modelo

        const response = await userModel.findById(id)
            .select('_id name email age')  //busco por id
            .populate('katas')

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Get User By Id: ${error}`)
    }
}

// KATAS BY USER: 
export const userKatas = async(id:string): Promise<any> => {
    try {
        const userModel = userEntity();
        const katasModel = kataEntity();

        let katasFound: IKata[] = [];

        let response: any = {
            user: '',
            katas: []
        };

        console.log('User ID', id);

        await userModel.findById(id).then(async (user: IUser) => {
            response.user = user.email;
            
            // console.log('Katas from User', user.katas);

            // Create types to search
            let objectIds: mongoose.Types.ObjectId[]  = [];
            user.katas.forEach((kataID: string) => {
                let objectID = new mongoose.Types.ObjectId(kataID);
                objectIds.push(objectID);
            });

            await katasModel.find({"_id": {"$in": objectIds }}).then((katas: IKata[]) => {
                //console.log(katas)
                katasFound = katas;
                response.katas = katasFound;
            });

        }).catch((error) => {
            LogError(`[ORM ERROR]: Obtaining User: ${error}`);
        })

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }

}


//TODO: LOGOUT

