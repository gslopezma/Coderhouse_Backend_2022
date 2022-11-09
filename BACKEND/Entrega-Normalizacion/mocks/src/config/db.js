import mongoose from "mongoose"
MONGO = "mongodb://localhost:27017/ecommerce"

mongoose.connect(process.env.MONGO, (err) => {
    err
        ? console.log("Error al conectarse a MongoDB")
        : console.log("Conectados a MongoDB")
})

export default mongoose