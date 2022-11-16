import express from "express"
import productRouter from './routes/product.js'
import cartRouter from './routes/cart.js'
import userRouter from './routes/user.js'
import session from 'express-session'
import {engine} from 'express-handlebars'
import path from 'path'
import {fileURLToPath} from 'url'
import mongoStore from 'connect-mongo'
import dotenv from "dotenv"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({path: path.resolve(__dirname, '../.env')})



const PORT = 8080
const app = express()



app.use(express.static('public'))

app.set('views', './src/views')
app.set('view engine', 'hbs')

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.mongoUrl,
            options: {
                userNewParser: true,
                useUnifiedTopology: true,
            }
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 600000} //10 min.
        
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)
app.use('/api/usuario', userRouter)

const server = app.listen(PORT, () => {
    console.log(`Escuchando el servidor ${PORT}`)
    })
    
server.on('error', (err) => console.log(err))