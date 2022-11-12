import { IKata } from './../../domain/interfaces/IKata.interface';
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
    createUser(user: any): Promise<any>
    updateUser(id: String, user: any): Promise<any>
}

export interface IKatasController {
    getKatas(): Promise<any>;
    getKataById(id:string): Promise<any>
    kataCreate(kata:IKata): Promise<any>
}