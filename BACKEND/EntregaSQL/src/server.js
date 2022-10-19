import { dbSQL } from './config.js'
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express'
import http from 'http'
import { Server } from "socket.io"
import hbs from 'express-handlebars'
const app = express()
const httpServer = http.createServer(app)
const socketServer = new Server(httpServer)

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.engine('hbs', hbs.engine({
  layoutsDir: __dirname + '/src/views/layouts',
  extname: '.hbs',
  defaultLayout: 'layout1.hbs'
}))

/*
app.set('views', './src/views')
app.set('view engine', 'hbs')
app.set('views', './src/views')
app.set('view engine', 'ejs')
*/

app.get('/', async (req, res) => {
  try {
    const products = await  dbSQL.from('products').select('*')
    if (products.length !== 0) {
      res.json({ products })
    } else {
      res.json({ products: 'No hay productos disponibles' })
      res.render(__dirname + '/public/index.hbs', { layout: 'layout1.hbs'})
  } } catch (error) {
    res.status(400).json(error)
  }
})

socketServer.on('connection', async (client) => {
  console.log('!Nuevo cliente conectado!')
  client.emit('mensajeBienvenida')
  client.emit('listaBienvenida')

  client.on('mensaje', async () => {
    socketServer.sockets.emit('mensajeBienvenida')
  })

  client.on('prodAgregado', async (req, res) => {
     const { nombre, precio, foto } = req.body

    try {
      const productCreated = await  dbSQL
        .from('products')
        .insert({ nombre, precio, foto })
      res.json({
        mensaje: 'producto creado con exito',
        productId: productCreated,
      })
      socketServer.sockets.emit('listabienvenida')
   } catch (error) {
      console.log(error)
   }
  })
})


const PORT = process.env.PORT || 8081
httpServer.listen(PORT, () => {
  console.log(`Esuchando al puerto ${PORT}`)
})

httpServer.on('error', (err) => console.log(err))
