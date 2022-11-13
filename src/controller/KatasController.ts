import { LogError, LogSuccess } from './../utils/loggers';
import { getKataById, getKatas, kataCreate, kataDelete, kataUpdate , getKataByLevel } from './../domain/orm/Katas.orm';
import { IKatasController } from './interfaces/index';


export class KatasController implements IKatasController {
    
    public async getKatas(): Promise<any> {
        try {
            LogSuccess('[/api/katas]: Get All Katas request');
            
            const response = await getKatas()
            
            return response;
        } catch (error) {
            LogError(`[ORM ERROR] Get All Katas: ${error}`)
        }
    }


    public async getKataById(id: string): Promise<any> {
        if(id){
            LogSuccess('[/api/katas/:id]: Get Kata By Id request');
            
            const response = await getKataById(id)
            
            return response;
        }else{
            LogError(`[ORM ERROR] Get Kata by Id: ${id}`)
        }
    }

    public async kataCreate(kata: any): Promise<any> {
        if(kata){
            LogSuccess('[/api/katas]: Create Kata Successfully');
            
            const response = await kataCreate(kata)
            
            return response;
        }else{
            LogError(`[ORM ERROR] User not created`)
        }
    }

    public async kataUpdate(id:string, kata:any): Promise<any> {
        if(id){
            LogSuccess(`[/api/katas/:id] Get kata and update: ${id}`)
            
            const response = await kataUpdate(id, kata)
            
            return response;
        }else{
            LogError(`[ORM ERROR] Kata not update`)
        }
    }
    
    public async kataDelete(id: string): Promise<any> {
        if(id){
            LogSuccess(`[/api/katas] Delete Kata by id: ${id}`)
            
            const response = await kataDelete(id);
            
            return response;
        }else{
            LogError(`[ORM ERROR] Kata not delete`)
        }
    }

    public async getKataByLevel(level:any): Promise<any> {
        if(level){
            LogSuccess(`[/api/katas/level] Get Kata by Query level: ${level}`)
            
            const response = await getKataByLevel(level)
            
            return response;
        }else{
            LogError(`[ORM ERROR] Kata by level not found`)
        }
    }
}