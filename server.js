const fs = require('fs')
const express = require("express")
const app = express()
const Contenedora = require(__dirname + "/contenedores.js")
const productos = new Contenedora(__dirname + "/productos.txt")
const PORT = 8080

app.get('/productos',(req,res) =>{
    res.send(productos.getAll())
})

app.get('/productoRandom',(req,res) =>{

  function randomInt() {
    let prod = [...JSON.parse(fs.readFileSync(__dirname + "/productos.txt", "utf8"))]
    return Math.floor(Math.random() * prod.length + 1)
  }
  
  
  let randNum = randomInt()
   console.log(randNum)
   res.send(productos.getById(randNum))
})


app.listen(PORT, (req,res) => {
  console.log(`Escuchando en el puerto ${PORT}`)
})


