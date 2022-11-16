
import { LogError } from '../../utils/loggers';
import { kataEntity } from '../entities/Katas.entity';

//Peticiones CRUD

/**
 * * Metodos para peticionar a la Base de datos
 */

// * GET ALL KATAS
export const getKatas = async(page:number, limit:number): Promise<any>=> {
    try {
        const kataModel = kataEntity();

        let response: any = {};
        
        const total = await kataModel.countDocuments();
        response.totalPages = Math.ceil(total / limit)
        response.currentPage = page;


        const katas = await kataModel.find()
            .select('_id name level')
            .limit(limit)
            .skip((page -1) * limit)
            .exec()
        response.katas = katas;


        return response;

    } catch (error) {
        LogError(`[ORM ERROR] Get All Katas: ${error}`)
    }
}
        
// * GET KATA BY ID
export const getKataById = async(id:string): Promise<any> => {
    
    try {
        const kataModel = kataEntity();

        const response = await kataModel.findById(id).select('_id name level')
        
        return response;
    } catch (error) {
        LogError(`[ORM ERROR] Get Kata By Id: ${error}`)
    }
}

// * KATA CREATE
export const kataCreate = async(kata: any): Promise<any> => {
    try {
        const kataModel = kataEntity();

        const response = await kataModel.create(kata)
        
        return response;
    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}`)
    }
}

// * KATA UPDATE
export const kataUpdate = async(id:string, kata:any): Promise<any> => {
    try {
        const kataModel = kataEntity();
        
        const response = await kataModel.findByIdAndUpdate(id, kata)
        
        return response;
    } catch (error) {
        LogError(`[ORM ERROR]: Update Kata: ${error}`)
    }
}


// * DELETE KATA BY ID
export const kataDelete = async(id:string): Promise<any> => {
    try {
        const kaytaModel = kataEntity();
        
        const response = await kaytaModel.findByIdAndDelete(id);
        
        return response;
    } catch (error) {
        LogError(`[ORM ERROR]: Delete Kata: ${error}`)
    }
}


// * KATA FILTER BY LEVEL
export const getKataByLevel = async(page:number, limit:number, level:any): Promise<any> => {
    try {
        const kataModel = kataEntity();
        
        const response = await kataModel.find({"level": level }).select('_id name level')

        return response
    } catch (error) {
        LogError(`[ORM ERROR]:Kata by Level: ${error}`)
    }
}
