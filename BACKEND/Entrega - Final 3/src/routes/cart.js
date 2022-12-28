import express from "express"
import { CarritoDao } from "../dao/CarritoDao.js"
import { ProductoDao } from "../dao/ProductoDao.js"
import logger from "../loggers/Log4jsLogger.js"

const router = express.Router()
const carritoDao = new CarritoDao()

// POST /api/carrito (Reordenar en GET-POST-PUT-DELETE?)
router.post('/', async (_req, res) => {
    const newCart = await carritoDao.createCart()
    
    newCart
        ? res.status(200).json({"success": "Carro añadido"})
        : res.status(500).json({"error": "No se pudo crear el carro"})
    
})

// DELETE /api/carrito/id
router.delete('/:id', async(req,res) => {
    const { id } = req.params
    const wasDeleted = await carritoDao.deleteCartById(id)
    
    wasDeleted 
        ? res.status(200).json({"success": "Carro eliminado"})
        : res.status(404).json({"error": "Carro no encontrado"})
     
})

// POST /api/carrito/:id/productos
router.post('/:id/productos', async(req,res) => {
    const { id } = req.params
    const { body } = req
    
    const productExists = await ProductoDao.exists(body.productId)
    
    if(productExists) {
        await carritoDao.saveProductToCart(id, body)
    } else {
        res.status(404).json({"error": "Producto no encontrado"})
    }
    
})

// GET /api/carrito/:id/productos
router.get('/:id/productos', async(req,res)=>{
    const { id } = req.params
    const cartProducts = await carritoDao.getAllProductsFromCart(id)
    
    cartProducts
        ? res.status(200).json(cartProducts)
        : res.status(404).json({"error": "Carro no encontrado"})
})


// DELETE /api/carrito/:id/productos/:id_prod
router.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params
    
    const wasDeleted = await carritoDao.deleteProductFromCart(id, id_prod)
    
    wasDeleted 
        ? res.status(200).json({"success": "Producto eliminado del carro"})
        : res.status(400).json({"error": "No se pudo eliminar el producto del carro. Verificar datos"})
    
})

export default router