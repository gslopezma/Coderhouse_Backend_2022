import {Router} from "express"
import { dbSQLite } from '../config.js'

const router = Router()

router.get(`/`, async (req, res) => {
    try {
        const chat = await dbSQLite.from("chat").select('*')
        if (chat.length !== 0) {
            res.json({ chat })
        } else {
            res.json({ chat: 'No hay mensajes' })
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res) => {
    try {
        const { usuario, mensaje } = req.body
        const nuevoMensaje = await dbSQLite.from("chat").insert({ usuario, mensaje });
        res.json({ nuevoMensaje })
    } catch (error) {
        console.log(error)
    }
})
router.delete('/:id', async (req, res) => {
    const  id  = req.params.id
    try {
        const mensaje = await dbSQLite.from("chat").where('id', id).del();
        res.json({ 'Se ha eliminado el mensaje: ': mensaje })
    } catch (error) {
        console.log(error)
    }
})
export default router