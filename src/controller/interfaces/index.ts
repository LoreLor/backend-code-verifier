import { DateResponse } from './../types/index';
import { BasicResponse } from "../types";

export  interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
} 

export interface IGoodbyeController {
    getMessage(name?:string): Promise<DateResponse>
}