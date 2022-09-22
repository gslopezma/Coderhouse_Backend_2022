const { Router } = require('express')
const fs = require('fs')
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
        res.render('index', { layout: 'layout2.hbs', productsArray } )
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', async (req, res) => {
    const { body } = req
    try {
        await readProductFile()
        let id = productsArray.length !== 0 ? body.id = productsArray.length + 1 : body.id = 1
        productsArray.push(body)
        await fs.promises.writeFile('products.txt', JSON.stringify(productsArray))

        res.redirect('/')

    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router
