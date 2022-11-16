import { IKata, KataLevel } from './../interfaces/IKata.interface';
import  mongoose  from 'mongoose';

export const kataEntity = () => {

    let kataSchema = new mongoose.Schema<IKata>(
        {
            name: {
                type: String,
                require: true
            },
            description: {
                type: String,
                require: true
            },
            level: {
                type: String,
                require: true
            },
            intents: {
                type: Number,
                require: true
            },
            stars: {
                type: Number,
                require: true
            },
            creator: {
                type: String,
                require: true
            },
            solution: {
                type: String,
                require: true
            },
            participants: {
                type: [],
                require: true
            }
        }
    )

    return mongoose.models.katas || mongoose.model('katas', kataSchema)
}