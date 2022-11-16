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

        }, process.env.JWT_KEY || 'SecretJWT', {expiresIn:"15d"}
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
    //verifico el Header
    let token: any = req.headers['x-access-token'];

    // Verify if jwt is present
    if(!token){
        return res.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorised to consume this endpoint'
        });
    }

    // Verify the token obtained. We pass the secret
    jwt.verify(token, process.env.JWT_KEY || 'Secret_JWT', (err: any, decoded: any) => {

        if(err){
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT token in request'
            });
        }

        // Execute Next Function -> Protected Routes will be executed
        next();

    });

}