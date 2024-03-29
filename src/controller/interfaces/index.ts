import { IKata, KataLevel } from './../../domain/interfaces/IKata.interface';
import { IAuth } from './../../domain/interfaces/IAuth.interface';
import { IUser } from './../../domain/interfaces/IUser.interface';

import { DateResponse } from './../types/index';
import { BasicResponse } from "../types";

export  interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
} 

export interface IGoodbyeController {
    getMessage(name?:string): Promise<DateResponse>
}



export interface IUserController {
    //read all users || user by id from database
    getUsers(page: Number, limit: Number, id?: String): Promise<any>

    // delete User By ID
    deleteUser(id?: String): Promise<any>

    //createUser(user: any): Promise<any>
    updateUser(id: string, user: any): Promise<any>

    // obtengo las katas de un usuario
    getKatas(page: number, limit: number, id?: string):Promise<any>
}



export interface IKatasController {
    // Read all users from database 
    getKatas(page: number, limit: number): Promise<any>;

    // get User By ID
    getKataById(id:string): Promise<any>

    // Create New Kata
    kataCreate(kata:IKata): Promise<any>

     // Update Kata
    kataUpdate(id:string, kata:IKata): Promise<any>
    
    // Delete Kata By ID
    kataDelete(id:string): Promise<any>

    getKataByLevel(page: number, limit: number, level:KataLevel): Promise<any>

    //upload files
    uploadKataFile(): Promise<any>


}


export interface IAuthController {
    userRegister(user:IUser):Promise<any>
    userLogin(auth:IAuth): Promise<any>
    userLogout(auth:IAuth): Promise<any>
    userData(id:string):Promise<any>
}


