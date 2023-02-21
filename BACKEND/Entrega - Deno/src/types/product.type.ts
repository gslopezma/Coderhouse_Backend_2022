import { ObjectId } from "../deps.ts"

export interface Product {
    _id: ObjectId,
    Nombre: String,
    Precio: Number,
    URL: String,
    stock: Number
}