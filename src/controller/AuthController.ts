import { IAuth } from './../domain/interfaces/IAuth.interface';
import { userLogin, userData } from './../domain/orm/User.orm';
import { LogSuccess, LogWarning, LogError } from './../utils/loggers';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuthController } from './interfaces/index';
import { userRegister } from '../domain/orm/User.orm';
import { Body, Get, Post, Route, Tags } from 'tsoa';


@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
    
    
    @Post('/register')
    public async userRegister(@Body()user: IUser): Promise<any> {
        if(user){
            LogSuccess(`[/api/auth/register] User Registered successfull: ${user}`)
            const response = await userRegister(user)
            return response
        }else{
            LogWarning(`[/auth/register] User not registered`)
        }
    }
    
    @Post('/login')
    public async userLogin(@Body()auth: IAuth): Promise<any> {
        let response;
        if(auth){
            LogSuccess(`[/api/auth/login] Login user is successfull: ${auth.email}`)
            const data = await userLogin(auth)
            response = {
                token: data.token,
                msg: `Welcome ${data.user.name}`
            }
            return response
        }else{
            LogWarning('[/api/auth/login] User not logged')
            
        }
    }

    @Get('/userData')
    public async userData(id: string): Promise<any | undefined> {
        let response: any = '';

        if(id){
            LogSuccess(`[/api/users?id]: Get User by id: ${id}`)

            response = await userData(id)
            // remover la contraseña para que no viaje
            response.password=""

            return response
        } else {
            LogError('[/api/auth/userData]: Get All Users request');

            response = {
                msg:'User not Found'
            }
        }
        return response
    }
    
    public async userLogout(): Promise<any> {
        throw new Error('Method not implemented.')
    }
    
}