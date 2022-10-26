import { Router } from "express"
import { dbSQL } from '../config.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await dbSQL.from('products').select('*')
        if (products.length !== 0) {
            res.json({ products })
        } else {
            res.json({ products: 'No hay productos disponibles' })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await dbSQL.from('products').where('id', id).select('*')
        if (product.length !== 0) {
            res.json({ product })
        } else {
            res.json({ mensaje: 'El producto solicitado no existe' })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const {nombre, precio, url} = req.body
    try {
        await dbSQL.from('products').insert({ nombre, precio, url })
        res.json({producto: 'Producto creado exitosamente'})
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const {nombre, precio, url} = req.body
    try {
        await dbSQL.from('products').where('id', id).update({ nombre, precio, url })
        res.json({mensaje: 'Producto actualizado exitosamente'})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await dbSQL.from('products').where('id', id).del()
        res.json({ mensaje: 'Producto eliminado exitosamente' })
    } catch (error) {
        console.log(error)
    }
})

export default router