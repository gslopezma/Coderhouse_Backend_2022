const { Router } = require('express')
const fs = require('fs')
const routerCart = Router()
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"])
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])


/* ------------------------ Cart Endpoints ------------------------ */

// POST /api/carrito

routerCart.post('/', async(req, res) => {
    const {body} = req
    
    body.timestamp = Date.now()
    body.products = []
    const newCartId = await carrito.save(body)
    
    newCartId
        ? res.status(200).json("Carrito agregado con exito bajo el ID:" +newCartId)
        : res.status(400).json("Error, validar datos")
    
})

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json("Carrito eliminado con exito")
        : res.status(404).json("Carrito no encontrado")
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    const {id} = req.params
    const { body } = req
    
    const product = await contenedor.getById(body['id'])
    
    if (product) {
        const carritoExiste = await carrito.addToArrayById(id, {"products": product})
        carritoExiste
            ? res.status(200).json("Producto agregado al carrito con exito")
            : res.status(404).json("Carrito no encontrado")
    } else {
        res.status(404).json("ID del producto invalido, validar datos")
    }
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    const { id } = req.params
    const cart = await carrito.getById(id)
    
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json("Carrito no encontrado")
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    const productExists = await contenedor.getById(id_prod)
    if (productExists) {
        const carritoExistes = await carrito.removeFromArrayById(id, id_prod, 'products')
        carritoExistes
            ? res.status(200).json("Producto removido del carrito con exito")
            : res.status(404).json("Carrito no encontrado")
    } else {
        res.status(404).json("ID del producto invalido, validar datos")
    }
})

module.exports = routerCart