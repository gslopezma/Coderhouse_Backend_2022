const { Router } = require('express')
const fs = require('fs')
const authMiddleware = require('../middlewares/index.js')
const routerProd = Router()
const Contenedor = require('./contenedor.js')
const contenedor = new Contenedor("productos.json", ["timestamp", "nombre", "precio", "descripcion", "codigo", "foto", "stock"])


routerProd.get('/', async (req, res) => {
    const products = await contenedor.getAll()
    res.status(200).json(products)
})


routerProd.get('/:id', async (req, res) => {
    const { id } = req.params
    const producto = await contenedor.getById(id)
    
    producto
        ? res.status(200).json(producto)
        : res.status(400).json("Producto no encontrado")
})


routerProd.post('/',authMiddleware, async (req,res, next) => {
    const {body} = req
    
    body.timestamp = Date.now()
    
    const idNuevoProd = await contenedor.save(body)
    
    idNuevoProd
        ? res.status(200).json("Producto añadido con ID: "+idNuevoProd)
        : res.status(400).json("Producto invalido. Verificar datos ingresados")
})


routerProd.put('/:id', authMiddleware ,async (req, res, next) => {
    const {id} = req.params
    const {body} = req
    const actualizado = await contenedor.updateById(id,body)
    
    actualizado
        ? res.status(200).json("Producto actualizado con exito")
        : res.status(404).json("Producto no encontrado")
})



routerProd.delete('/:id', authMiddleware, async (req, res, next) => {
    const {id} = req.params
    const eliminado = await contenedor.deleteById(id)
    
    eliminado 
        ? res.status(200).json("Producto eliminado con exito")
        : res.status(404).json("Producto no encontrado")
})
module.exports = routerProd
