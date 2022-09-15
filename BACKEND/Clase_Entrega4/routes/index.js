const { Router } = require('express')
const fs = require('fs')
const dataValidation = require('../middlewares/index.js')
const router = Router()
let productsArray = []

let readProductFile = async () => {
    try {
        const productsFile = await fs.promises.readFile('products.txt', 'utf-8')
        productsArray = JSON.parse(productsFile)
    } catch (error) {
        console.log(error)
    }
}



router.get('/', async (req, res) => {
    try {
        await readProductFile()
        res.send(productsArray)

    } catch (error) {
        res.status(400).json(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await readProductFile()
        const idObj = productsArray.find(prod => {
            return prod.id = id
        })
        res.send(idObj)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', dataValidation, async (req, res) => {
    const { body } = req
    try {
        await readProductFile()
        let id = productsArray.length !== 0 ? body.id = productsArray.length + 1 : body.id = 1
        productsArray.push(body)
        await fs.promises.writeFile('products.txt', JSON.stringify(productsArray))
        res.status(200).json({ mensaje: 'Producto agregado con exito', productsArray })

    } catch (error) {
        res.status(400).json(error)
    }
})

router.put('/:id', dataValidation, async (req, res) => {
    const { id } = req.params
    const { nombre, precio, stock } = req.body
    try {
        await readProductFile()
        const prods = productsArray.find((producto) => producto.id == id)
        if (!prods) {
            res.send({ error: "El producto no existe" })
        } else {
            console.log(prods)
            prods.nombre = nombre
            prods.precio = precio
            prods.stock = stock
            await fs.promises.writeFile('products.txt', JSON.stringify(productsArray))
            res.status(200).json({ mensaje: 'Producto editado con exito', productsArray })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await readProductFile()
        const filter = productsArray.filter(num => num.id !== id)
        await fs.promises.writeFile('products.txt', JSON.stringify(filter))
        res.status(200).json({ mensaje: 'Producto eliminado con exito', productsArray })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router