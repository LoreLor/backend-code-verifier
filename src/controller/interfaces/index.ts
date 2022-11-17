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
    
    deleteUser(id?: String): Promise<any>
    //createUser(user: any): Promise<any>
    updateUser(id: string, user: any): Promise<any>

    // obtengo las katas de un usuario
    getUserKatas(page: number, limit: number, id?: string):Promise<any>
}

export interface IKatasController {
    getKatas(page: number, limit: number): Promise<any>;
    getKataById(id:string): Promise<any>
    kataCreate(kata:IKata): Promise<any>
    kataUpdate(id:string, kata:any): Promise<any>
    kataDelete(id:string): Promise<any>

    getKataByLevel(page: number, limit: number, level:KataLevel): Promise<any>


}

export interface IAuthController {
    userRegister(user:IUser):Promise<any>
    userLogin(auth:IAuth): Promise<any>
    userLogout(auth:IAuth): Promise<any>

    userData(id:string):Promise<any>
}