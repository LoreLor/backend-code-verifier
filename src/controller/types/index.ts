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