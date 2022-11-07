import { userEntity } from "../entities/User.entity";

import { LogError, LogSuccess } from "@/utils/loggers";

//Peticiones CRUD


/**
 * Metodo para obtener todod los Usuarios de la coleccion de Mongo
 */
export const getAllUsers = async () : Promise<any[] | undefined> => {
    try {
        const userModel = userEntity();
        const allUsers = await userModel.find({isDelete: false})
        //busco todos los usuarios
        
        return allUsers
        
    } catch (error) {
        LogError(`[ORM ERROR]: ${error}`)
    }
}

//TODO: getUserById - getUserByName - deleteUser - createUser - Update