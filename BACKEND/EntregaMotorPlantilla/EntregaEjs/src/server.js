const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const productRoutes = require('../routes/index.js')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productRoutes)


app.set('views', './src/views')
app.set('view engine','ejs')

app.get('/', (req, res) => {
  res.render('pages/index')
})


const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Esuchando al puerto ${PORT}`)
})