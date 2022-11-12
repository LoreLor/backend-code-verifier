import mongoose from "mongoose";

export const userEntity = () => {

    let userSchema = new mongoose.Schema(
        {
            name: String,
            email: String,
            age: Number
        }
    )
//si eexiste que me lo devuelva y si no que lo genere
    return mongoose.models.users || mongoose.model('users', userSchema);
    
}