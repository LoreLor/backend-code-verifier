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
    getUsers(id?: String): Promise<any>
    deleteUser(id?: String): Promise<any>
    //createUser(user: any): Promise<any>
    updateUser(id: String, user: any): Promise<any>
}

export interface IKatasController {
    getKatas(): Promise<any>;
    getKataById(id:String): Promise<any>
    kataCreate(kata:any): Promise<any>
    kataUpdate(id:String, kata:any): Promise<any>
    kataDelete(id:string): Promise<any>

    getKataByLevel(level:Number): Promise<any>
}

export interface IAuthController {
    userRegister(user:IUser):Promise<any>
    userLogin(auth:IAuth): Promise<any>
    userLogout(auth:IAuth): Promise<any>
}