
import { getUserById, getAllUsers, deleteUserById, createUser, updateUser} from '../domain/orm/User.orm';
import { LogSuccess, LogWarning } from '../utils/loggers';

import { IUserController } from './interfaces/index';

import {  Body, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';


//para documentar con tsa
@Route('/api/users')
@Tags('UsersController')
export class UserController implements IUserController {
    
    /**
     * Endpoint to retrieve the Users in the Collection "users" of DB
     * @param {string} id  Id of user to retriev (optional)
     * @returns All Users or User by Id
     */
    @Get('/')
    public async getUsers(@Query()id?: String): Promise<any> {

        if(id){
                LogSuccess(`[/api/users?id]: Get User by id: ${id}`)

                const response = await getUserById(id)
        
                return response
        }else{
            LogSuccess('[/api/users]: Get All Users request');
            
            const response = await getAllUsers()  
            
            return response
        }
    }   
    

    
    /**
     * Endpoint to delete User in the Collection "users" of DB
     * @param {string} id  Id of user to delete (optional)
     * @returns delete user by id  message 
     */
    @Delete('/')
    public async deleteUser(@Query()id?: string): Promise<any> {
        let response:any = '';
        if(id){
            LogSuccess(`[/api/users] Delete user by id: ${id}`)
             response = await deleteUserById(id)
             console.log('Usuer deleted')
          
        }else{
            LogWarning('[/api/users] Delete User Request WITHOUT ID')
            response = {
                message:'Please, provide an ID to remove from database'
            }
        }
        return response
    }

    /**
     * Endpoint to post a new User in the Collection "users" of DB
     * @param { any } user Object created
     * @returns User created in DB
     */
    @Post('/')
    public async createUser(@Body() user?:any): Promise<any> {
        if(user){
            const response = await createUser(user)
            LogSuccess(`[/api/users] User Created: ${user.name}`)
            return response       
            
        } else {
            LogWarning(`[/api/users] Create User: Oops something wrong`)
        }  
    }   

    @Put('/')
    public async updateUser(@Query()id:string, @Body()user: any): Promise<any> {
        if(id){
            const response = await updateUser(id, user)
            LogSuccess(`[/api/users] User Updated: ${user} updating successfull`)
            return response
        }else{
            LogWarning(`[/api/users] Update User: Can not user updating provide any ID`)
        }
    }
}