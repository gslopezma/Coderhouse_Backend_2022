import { ProductoService } from "../services/producto.service.js"

const productoService = ProductoService.getInstance()

export async function getAll(req, res) {
    const products = await productoService.getAll()
    products
        ? res.status(200).json(products)
        : res.status(400).json({ "error": "No se pudo listar los productos" })
}

export async function getById(req, res) {
    const { id } = req.params
    const product = await productoService.getProductById(id)

    product
        ? res.status(200).json(product)
        : res.status(400).json({ "error": "Producto no encontrado" })
}

export async function create(req, res) {
    const { body } = req
    const newProduct = await productoService.createProduct(body)

    newProduct
        ? res.status(200).json({ "success": "Producto añadido" })
        : res.status(400).json({ "error": "No se pudo añadir el producto. Verificar datos" })
}

export async function update(req, res) {
    const { id } = req.params
    const { body } = req
    const wasUpdated = await productoService.updateProductById(id, body)

    wasUpdated
        ? res.status(200).json({ "success": "Producto actualizado" })
        : res.status(404).json({ "error": "Producto no encontrado" })
}

export async function remove(req, res) {
    const { id } = req.params
    const wasDeleted = await productoService.deleteProductById(id)

    wasDeleted
        ? res.status(200).json({ "success": "Producto removido" })
        : res.status(404).json({ "error": "Producto no encontrado" })
}