import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import UserModel from "../models/UserModel.js";

const generateToken = (name, email) => {
    const token = jwt.sign({
        name,
        email
    },process.env.SECRET_KEY,
    {
        expiresIn: '24h'
    })
    return token
}

class AuthService {
    async signUp(data) {
        const salt = await bcrypt.genSalt(4);
        const hashedPassword = await bcrypt.hash(String(data.password), salt);
        const user = await UserModel.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        })
        return {
            token: generateToken(user.name, user.email)
        }
    }

    async singIn(data) {
        const user = await UserModel.findOne({email: data.email})
        if(user){
            const comparePassword = await bcrypt.compare(String(data.password), user.password)
            console.log(comparePassword)
            if(comparePassword){
                return {
                    token: generateToken(user.name, user.email)
                }
            }
        }
        return {
            message: 'Invalid email or password',
            status: 400
        }
    }
}

export default new AuthService()