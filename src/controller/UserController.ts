import { userKatas } from './../domain/orm/User.orm';

import { getUserById, getAllUsers, deleteUserById, updateUser } from '../domain/orm/User.orm';
import { LogSuccess, LogWarning } from '../utils/loggers';

import { IUserController } from './interfaces/index';

import { Body, Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { get } from 'http';


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
    public async getUsers(@Query() page:number, @Query() limit:number, @Query() id?:string): Promise<any> {

        if (id) {
            LogSuccess(`[/api/users?id]: Get User by id: ${id}`)

            const response = await getUserById(id)

            return response
        } else {
            LogSuccess('[/api/users]: Get All Users request');

            const response = await getAllUsers(page, limit)

            return response
        }
    }



    /**
     * Endpoint to delete User in the Collection "users" of DB
     * @param {string} id  Id of user to delete (optional)
     * @returns delete user by id  message 
     */
    @Delete('/')
    public async deleteUser(@Query() id?: string): Promise<any> {
        let response: any = '';
        if (id) {
            LogSuccess(`[/api/users] Delete user by id: ${id}`)

            response = await deleteUserById(id)

            console.log('User deleted')

        } else {
            LogWarning('[/api/users] Delete User Request WITHOUT ID')

            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }
        return response
    }

    
    // @Post('/')
    //public async createUser(@Body() user?: any): Promise<any> {
    //     if (user) {
    //         const response = await createUser(user)

    //         LogSuccess(`[/api/users] User Created: ${user.name}`)

    //         return response

    //     } else {
    //         LogWarning(`[/api/users] Create User: Oops something wrong`)
    //     }
    // }

    /**
     * Endpoint to update an User in the Collection "users" of DB
     * @param { string } id @param {any} user  recives user Id and update Object user
     * @returns User updating in DB
     */
    @Put('/')
    public async updateUser(@Query() id: string, @Body() user: any): Promise<any> {
        if (id) {
            LogSuccess(`[/api/users] User Updated: ${user} updating successfull`)
            const response = await updateUser(id, user)


            return response
        } else {
            LogWarning(`[/api/users] Update User: Can not user updating provide any ID`)
        }
    }

    @Get('/katas')
    public async getUserKatas(@Query() page: number, @Query() limit: number, @Query() id: string): Promise<any> {
       if(id){
            LogSuccess(`[/api/users/katas] Get Katas from User By ID: ${id} `);
            
            const response = await userKatas(id)
            
            return response

       }else{
            LogSuccess('[/api/users/katas] Get All Katas without id')

            const response = 'ID from user is needed'
            
            return response
       }       
    }
}