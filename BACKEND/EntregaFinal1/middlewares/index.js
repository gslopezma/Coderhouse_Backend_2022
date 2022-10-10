const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const authMiddleware = app.use((req, res, next) => {
    req.header('authorization') == "true"
        ? next()
        : res.status(401).json({"Error": "Acceso no autorizado"})
})

module.exports = authMiddleware