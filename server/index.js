import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
dotenv.config()

const PORT = process.env.PORT

const app = express()
export const client = new MongoClient(process.env.MONGO_DB_CONNECTION)

const start = async () => {
    try{
        await client.connect()
        app.listen(PORT, () => {
            console.log('App started') 
        })
    }catch{
        console.log(e)
    }
}

start()

