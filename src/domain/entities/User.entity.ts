import mongoose from "mongoose";

export const userEntity = () => {

    let userSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            age: {
                type: Number,
                require: true
            }
        }
    )
//si eexiste que me lo devuelva y si no que lo genere
    return mongoose.models.users || mongoose.model('users', userSchema);
    
}