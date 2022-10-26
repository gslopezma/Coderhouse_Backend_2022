import express from 'express'
import productos from './routes/productos.js'
import chat from './routes/chat.js'
import "./start/CreateTables.js";
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//  rutas inicializar:
app.use("/productos", productos)
app.use("/chat", chat)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Escuchando el servidor ${PORT}`);
})