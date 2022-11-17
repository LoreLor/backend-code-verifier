import { IKata, KataLevel } from './../domain/interfaces/IKata.interface';
import { LogError, LogSuccess } from './../utils/loggers';
import { getKataById, getKatas, kataCreate, kataDelete, kataUpdate , getKataByLevel } from './../domain/orm/Katas.orm';
import { IKatasController } from './interfaces/index';
import { Body, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';

@Route('/api/katas')
@Tags("KatasController")
export class KatasController implements IKatasController {


    /**
     * Endpoint to retrieve the Katas in the Collection "katas" of DB
     * @param {number} page @param {number} limit pagination
     * @returns katas with pagination
     */
    @Get('/')
    public async getKatas(@Query() page:number, @Query() limit:number): Promise<any> {
        try {
            LogSuccess('[/api/katas]: Get All Katas request');
            
            const response = await getKatas(page, limit)
            
            return response;
        } catch (error) {
            LogError(`[ORM ERROR] Get All Katas: ${error}`)
        }
    }

    /**
     * Endpoint to get Kata By Id in the Collection "katas" of DB
     * @param {string} id  query param from Id of kata 
     * @returns detail of kata
     */
    @Get('/:id')
    public async getKataById(@Path() id:string): Promise<any> {
        if(id){
            LogSuccess('[/api/katas/:id]: Get Kata By Id request');
            
            const response = await getKataById(id)
            
            return response;
        }else{
            LogError(`[ORM ERROR] Get Kata by Id: ${id}`)
        }
    }

    /**
     * Endpoint to post a new Kata in the Collection "katas" of DB
     * @param {IKata} kata object with data from body
     * @returns the new kata created
     */
    @Post('/')
    public async kataCreate(@Body() kata: IKata): Promise<any> {
        if(kata){
            LogSuccess('[/api/katas]: Create Kata Successfully');
            
            const response = await kataCreate(kata)
            
            return response;
        }else{
            LogError(`[ORM ERROR] User not created`)
        }
    }


    /**
     * Endpoint to update an Kata in the Collection "katas" of DB
     * @param { string } id @param {IKata} kata  recives user Id and update Object user
     * @returns Kata updating in DB
     */
    @Put('/:id')
    public async kataUpdate(@Path() id:string, @Body() kata:IKata): Promise<any> {
        if(id){
            LogSuccess(`[/api/katas/:id] Get kata and update: ${id}`)
            
            const response = await kataUpdate(id, kata)
            
            return response;
        }else{
            LogError(`[ORM ERROR] Kata not update`)
        }
    }
    

    /**
     * Endpoint to delete Kata in the Collection "katas" of DB
     * @param {string} id  Id of kata to delete (optional)
     * @returns delete kata by id  message 
     */
    @Delete('/:id')
    public async kataDelete(@Path() id: string): Promise<any> {
        if(id){
            LogSuccess(`[/api/katas/:id] Delete Kata by id: ${id}`)
            
            const response = await kataDelete(id);
            
            return response;
        }else{
            LogError(`[ORM ERROR] Kata not delete`)
        }
    }

    /**
     * Endpoint to get Kata By Level in the Collection "katas" of DB
     * @param {KataLevel} level  query param from Id of kata 
     * @returns detail of kata
     */
    @Get('')
    public async getKataByLevel(@Query() page:number, @Query() limit:number, @Query() level:KataLevel): Promise<any> {
        if(level){
            LogSuccess(`[/api/katas?level] Get Kata by Query level: ${level}`)
            
            const response = await getKataByLevel(page, limit, level)
            
            return response;
        }else{
            LogError(`[ORM ERROR] Kata by level not found`)
        }
    }
}