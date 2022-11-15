import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()




/**
 * 
 * @param {any} user 
 * @returns token
 */
export const generateToken = (user:any) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age

        }, process.env.JWT_KEY || 'SecretJWT', {expiresIn:'1d'}
    )
}



/**
 * 
 * @param { Request } req Origginal request previous middleware of verification JWT
 * @param { Response } res Response to cerification of Jwt
 * @param { NextFunction } next Next Function to be executed
 * @returns Errors of verifications or next execution
 */
export const verifyToken = async(req:Request, res:Response, next:NextFunction) => {
    //verifico la cabecera
    const authorization :any = req.headers.authorization;

    //verifico si el usuario esta autorizado
    if(authorization){
        const token = authorization.slice(7, authorization.length); //Bearer XXXXXX

        jwt.verify(token, process.env.JWT_KEY || 'SecretJWT', (err: any, decode: any) => {
            if(err){
                return res.status(403).send({
                    authenticationError: 'Missing JWT in request',
                    message: 'Not authorised to consume this endpoint'
                })
            }else{
                req= decode; 
                next();
            }
        })
    }else{
        return res.status(404).send({msg:'No Token'})
    }
}