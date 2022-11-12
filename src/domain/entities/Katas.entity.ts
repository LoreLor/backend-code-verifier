import  mongoose  from 'mongoose';

export const kataEntity = () => {

    let kataSchema = new mongoose.Schema(
        {
            name: String,
            description: String,
            level: Number,
            intents: Number,
            stars: Number,
            creator: String,
            solution: String,
            participants: String
        }
    )

    return mongoose.model('katas', kataSchema)
}