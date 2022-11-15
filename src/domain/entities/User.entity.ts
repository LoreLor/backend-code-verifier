import { IUser } from './../interfaces/IUser.interface';
import mongoose from "mongoose";

export const userEntity = () => {

    let userSchema = new mongoose.Schema<IUser>(
        {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                require: true
            },
        }
    )
//si eexiste que me lo devuelva y si no que lo genere
    return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema);
    
}