const express = require('express')
const productRoutes = require('./routes/index.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', productRoutes)

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/BACKEND/Clase_Entrega4/files/index.html') 
})
const PORT = process.env.port || 8080
app.listen(PORT,() =>{
    console.log(`Escuchando el puerto ${PORT}`)
})
.on('error',(error) => console.log(error))