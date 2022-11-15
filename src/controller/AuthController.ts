import { IAuth } from './../domain/interfaces/IAuth.interface';
import { userLogin } from './../domain/orm/User.orm';
import { LogSuccess, LogWarning } from './../utils/loggers';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuthController } from './interfaces/index';
import { userRegister } from '../domain/orm/User.orm';
import { Body, Post, Route, Tags } from 'tsoa';


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
        if(auth){
            LogSuccess(`[/api/auth/login] Login user is successfull: ${auth.email}`)
            const data = await userLogin(auth)
            const response = {
                token: data.token,
                msg: `Welcome ${data.user.name}`
            }
            return response
        }else{
            LogWarning('[/api/auth/login] User not logged')
        }
    }
    
    public async userLogout(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    
}