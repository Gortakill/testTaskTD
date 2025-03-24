import express from "express";
import mongoose from "mongoose";
import './models/UserModel.js'
import authRouter from './routes/AuthRoutes.js'
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT
const CONNECTION_URI = process.env.ATLAS_URI || ""

const app = express()

app.use(express.json())
app.use('/api', authRouter)

const start = async() => {
    await mongoose.connect(CONNECTION_URI)
    app.listen(PORT, () => {
        console.log('App started') 
    })
}

start()

