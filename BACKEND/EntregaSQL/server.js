const express = require('express')
const fs = require('fs')
const app = express()
const http = require('http')
const httpServer = http.createServer(app)
const { Server: SocketServer } = require('socket.io')
const socketServer = new SocketServer(httpServer)
const hbs = require('express-handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.engine('hbs', hbs.engine({
  partialsDir: __dirname + '/src/views/partials',
  layoutsDir: __dirname + '/src/views/layouts',
  extname: '.hbs',
  defaultLayout: 'layout1.hbs'
}))

let productsArray = []

let readProductFile = async () => {
  try {
    const productsFile = await fs.promises.readFile('products.txt', 'utf-8')
    productsArray = JSON.parse(productsFile)
  } catch (error) {
    console.log(error)
  }
}

app.set('views', './src/views')
app.set('view engine', 'hbs')
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  try {
    await readProductFile()
    res.render(__dirname + '/public/index.hbs', { layout: 'layout1.hbs', productsArray })
  } catch (error) {
    res.status(400).json(error)
  }
})

const mensajes = []
socketServer.on('connection', async (client) => {
  console.log('!Nuevo cliente conectado!')
  client.emit('mensajeBienvenida', mensajes)
  await readProductFile()
  client.emit('listaBienvenida', productsArray)

  client.on('mensaje', (obj) => {
    mensajes.push(obj)
    socketServer.sockets.emit('mensajesArray', mensajes)
  })

  client.on('prodAgregado', async (req, res) => {
    const body = req
    try {
      await readProductFile()
      let id = productsArray.length !== 0 ? body.id = productsArray.length + 1 : body.id = 1
      productsArray.push(body)
      await fs.promises.writeFile('products.txt', JSON.stringify(productsArray))
      socketServer.sockets.emit('listarProds', body)
    } catch (error) {
      res.status(400).json(error)
    }
  })
})

const PORT = process.env.PORT || 8081
httpServer.listen(PORT, () => {
  console.log(`Esuchando al puerto ${PORT}`)
})

httpServer.on('error', (err) => console.log(err))