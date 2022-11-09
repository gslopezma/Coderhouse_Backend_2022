import express from "express"
import { ProductoDao } from "../dao/ProductoDao.js"
import { ProductMocker } from '../mocks/productMocker.js'
const router = express.Router()
const productoDao = new ProductoDao()


// GET api/productos

router.get('/', async (_req, res) => {
    const products = await productoDao.getAll()
    products
        ? res.status(200).json(products)
        : res.status(400).json({"error": "No se pudo listar los productos"})
    
})

// GET api/productos/:id

router.get('/:id', async(req, res) => {
    const { id } = req.params
    const product = await productoDao.getProductById(id)
    
    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "Producto no encontrado"})
    
})

// GET api/productos/test

router.get('/test', async(req,res) => {
    const productMocker = new ProductMocker(5)
    const products = productMocker.generateRandomProducts()
    res.status(200).json(products)
})


// POST api/productos
router.post('/', async (req,res) => {
    const { body } = req
    const newProduct = await productoDao.createProduct(body)
    
    newProduct
        ? res.status(200).json({"success": "Producto añadido"})
        : res.status(400).json({"error": "No se pudo añadir el producto. Verificar datos"})
    
})

// PUT api/productos/:id
router.put('/:id', async (req,res) => {
    const { id } = req.params
    const { body } = req
    const wasUpdated = await productoDao.updateProductById(id, body)
    
    wasUpdated
        ? res.status(200).json({"success":"Producto actualizado"})
        : res.status(404).json({"error": "Producto no encontrado"}) 
})


// DELETE /api/productos/id

router.delete('/:id', async (req,res) => {
    const { id } = req.params
    const wasDeleted = await productoDao.deleteProductById(id)

    wasDeleted 
        ? res.status(200).json({"success":"Producto removido"})
        : res.status(404).json({"error": "Producto no encontrado"})
})

export default router
