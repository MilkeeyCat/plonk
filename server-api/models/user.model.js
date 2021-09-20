import mongoose from "mongoose"

const UserSchema = new  mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    token: { type: String, required: true },
})

export const User = mongoose.model("User", UserSchema)