import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    precio: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        max: 200
    }
})

export const ProductosModel = mongoose.model("productos", Schema)