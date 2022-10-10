const express = require('express')
const productRoutes = require('./routes/productos.js')
const carritoRoutes = require('./routes/carrito.js')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use('/api/productos', productRoutes)
app.use('/api/carrito', carritoRoutes)


const PORT = process.env.port || 8080
app.listen(PORT,() =>{
    console.log(`Escuchando el puerto ${PORT}`)
})
.on('error',(error) => console.log(error))
