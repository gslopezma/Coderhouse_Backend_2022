const fs = require('fs')

class Contenedor {
  constructor(nomArch) {
    this.nomArch = nomArch
    this.productos = []
  }
    async save (objeto) {
        try {
            let id = this.productos.length> 0 ? this.productos[this.productos.length-1].id + 1 : 1
            objeto.id = id
            this.productos.push(objeto)

            await fs.promises.writeFile(this.nomArch, JSON.stringify(this.productos))
            return id
        }
        catch (error){
            return(error)
        }
    }

    getById (id)  {
        this.prods = [...JSON.parse(fs.readFileSync(this.nomArch, "utf8"))]
        const idObj = this.prods.find(producto => {
            return producto.id === id
        })
        if(idObj){
            console.log(idObj)
            return idObj
        } else {
            return null
        }
    }

    getAll() {
          this.prods = [...JSON.parse(fs.readFileSync(this.nomArch, "utf8"))]
          return this.prods
    }

    deleteById (id) {
            const prodfinal = this.productos.filter(producto => producto.id !== id)
            this.productos = prodfinal
            console.log (prodfinal)
            return fs.promises.writeFile(this.nomArch, JSON.stringify(prodfinal))
    }

     deleteAll() {
        return fs.promises.writeFile(this.nomArch, JSON.stringify([]))
        .then(() => "se han eliminado los registros")
        .catch(error => error)
    }
}

module.exports = Contenedor
