
import { LogError } from './../../utils/loggers';
import { userEntity } from "../entities/User.entity";



//Peticiones CRUD


/**
 * Metodo para obtener todos los Usuarios de la coleccion de Mongo
 */
export const getAllUsers = async () : Promise<any[] | undefined> => {
    try {
        //me traigo el modelo
        const userModel = userEntity();
        
        const allUsers = await userModel.find({isDelete: false})
        //busco todos los usuarios
        
        return allUsers
        
    } catch (error) {
        LogError(`[ORM ERROR]: ${error}`)
    }
}

// GET USER BY ID

export const getUserById = async (id: String) :Promise<any> => {
    try {
        const userModel = userEntity();  //me traigo el modelo

        const response = await userModel.findById(id)  //busco por id
        
        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Get User By Id: ${error}`)
    }
} 

// DELETE USER BY ID
export const deleteUserById = async(id: string) : Promise<any>=> {
    try {
        const userModel = userEntity();

        const response = await userModel.deleteOne({_id: id});

        return response;
    } catch (error) {
        LogError(`[ORM ERROR] Delete user by Id: ${error}`)
    }
}


// CREATE USER
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
export const updateUser = async(id: String, user:any): Promise<any> => {
    try {
        const userModel = userEntity();

        const response = await userModel.findByIdAndUpdate(id, user)

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
}