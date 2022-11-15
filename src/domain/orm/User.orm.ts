import { generateToken } from './../../middleware/tokens';
import { IUser } from './../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';

import { LogError, LogWarning } from './../../utils/loggers';
import { userEntity } from "../entities/User.entity";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

//Peticiones CRUD


/**
 * Metodo para obtener todos los Usuarios de la coleccion de Mongo
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        //me traigo el modelo
        const userModel = userEntity();

        const allUsers = await userModel.find({ isDelete: false })
        //busco todos los usuarios

        return allUsers

    } catch (error) {
        LogError(`[ORM ERROR]: ${error}`)
    }
}

// GET USER BY ID

export const getUserById = async (id: String): Promise<any> => {
    try {
        const userModel = userEntity();  //me traigo el modelo

        const response = await userModel.findById(id)  //busco por id

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
// export const createUser = async(user: any): Promise<any> => {

//     try {
//         const userModel = userEntity();

//         const response = await userModel.create(user);

//         return response

//     } catch (error) {
//         LogError(`[ORM ERROR] Create User: ${error}`)
//     }
// }

// UPDATE USER
export const updateUser = async (id: String, user: any): Promise<any> => {
    try {
        const userModel = userEntity();

        const response = await userModel.findByIdAndUpdate(id, user)

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
}


// REGISTER USER
export const userRegister = async (user: IUser): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        const response = await userModel.create(user)

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Registered User ${user}: ${error}`);
    }
}


// LOGIN USER
export const userLogin = async (auth: IAuth): Promise<any | undefined> => {
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

        const response = await userModel.findById(id)  //busco por id

        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Get User By Id: ${error}`)
    }
}


//TODO: LOGOUT

