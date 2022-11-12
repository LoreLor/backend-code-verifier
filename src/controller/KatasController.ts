import { LogError, LogSuccess } from './../utils/loggers';
import { getKataById, getKatas, kataCreate } from './../domain/orm/Katas.orm';
import { IKatasController } from './interfaces/index';
import { IKata } from '@/domain/interfaces/IKata.interface';

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

    public async kataCreate(kata: IKata): Promise<any> {
        if(kata){
            LogSuccess('[/api/katas]: Create Kata Successfully');
            const response = await kataCreate(kata)
            return response;
        }else{
            LogError(`[ORM ERROR] User not created`)
        }
    }
}