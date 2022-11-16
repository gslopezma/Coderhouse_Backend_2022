import mongoose from "mongoose"
import dotenv from "dotenv"
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({path: path.resolve(__dirname, '../.env')})

mongoose.connect(process.env.MONGO, (err) => {
    err
        ? console.log("Error al conectarse a MongoDB")
        : console.log("Conectados a MongoDB")
})

export default mongoose