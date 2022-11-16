import { IUser } from './../../domain/interfaces/IUser.interface';
/**
 * Para definir la estructura de mis datos: devuelve un json
 */
export type BasicResponse = {
    message: string
}

export type Errorresponse = {
    error: string,
    message: string
}

export type DateResponse = {
    message: string,
    Date: any
}

export type UserResponse = {
    users: IUser[],
    totalPages: number,
    currentPage: number
}