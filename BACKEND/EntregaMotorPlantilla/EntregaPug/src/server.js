const express = require('express')
const app = express()
const productRoutes = require('../routes/index.js')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productRoutes)

/*
app.engine('hbs', hbs.engine({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  extname: '.hbs',
  defaultLayout: 'layout1.hbs'
}))
*/
app.set('views', './src/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/personas', (req, res) => {
  const { body } = req
  personas.push(body)
  //res.send('Persona agregada con exito')
  res.redirect('/')
})




const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Esuchando al puerto ${PORT}`)
})