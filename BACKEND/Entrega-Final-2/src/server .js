import express from "express"
import productRouter from './routes/producto.js'
import cartRouter from './routes/carro.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)

const server = app.listen(PORT, () => {
    console.log(`Escuchando el servidor ${PORT}`)
    })
    
server.on('error', (err) => console.log(err))