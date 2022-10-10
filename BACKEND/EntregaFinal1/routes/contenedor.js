const fs = require("fs")

class Contenedor {
  constructor(fileName, keys) {
    this._filename = fileName
    this._keys = [...keys, "id"]
    this.leerOCrearArchivo()
  }
  
  validarObjeto(newData) {
    const objectKeys = Object.keys(newData)
    let exists = true
    objectKeys.forEach((key) => {
      if(!this._keys.includes(key)) {
        exists = false;
       
      }
    })
    return exists
  }

  async leerOCrearArchivo() {
    try {
      await fs.promises.readFile(this._filename, "utf-8")
    } catch (error) {
      error.code === "ENOENT"
        ? this.crearArchivo()
        : console.log(
            `Error: ${error.code} | Hubo un error al internar leer el archivo ${this._filename}`
          )
    }
  }

  async crearArchivo() {
    fs.writeFile(this._filename, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(`File ${this._filename} was created since it didn't exist in the system`);
    });
  }

  async getById(id) {
    id = Number(id)
    try {
      const data = await this.getData()
      const parsedData = JSON.parse(data)

      return parsedData.find((producto) => producto.id === id)
    } catch (error) {
        console.log(error)
  }}

  async deleteById(id) {
    try {
      id = Number(id)
      const data = await this.getData()
      const parsedData = JSON.parse(data)
      const objectIdToBeRemoved = parsedData.find(
        (producto) => producto.id === id
      )

      if (objectIdToBeRemoved) {
        const index = parsedData.indexOf(objectIdToBeRemoved)
        parsedData.splice(index, 1)
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData))
        return true
      } else {
        console.log(`ID ${id} inexistente`)
        return null
      }
    } catch (error) {
        console.log(error)
    }
  }

  async updateById(id, newData) {
    if(this.validarObjeto(newData)){
      try {
        id = Number(id)
        const objectKeys = Object.keys(newData)
        const data = await this.getData()
        const parsedData = JSON.parse(data)
        const idActualizar = parsedData.find(
          (producto) => producto.id === id
        )
        if (idActualizar) {
          const index = parsedData.indexOf(idActualizar)
          objectKeys.forEach( (key) => {
            parsedData[index][key] = newData[key]
          })
          
          
          await fs.promises.writeFile(this._filename, JSON.stringify(parsedData))
          return true
        } else {
          return null
        }
  
      } catch (error) {
        console.log(error)
      }
    } else {
      return false
    }
  
    
  }
  
  async addToArrayById(id, objectToAdd) {
    if(this.validarObjeto(objectToAdd)) {
    try {
      id = Number(id)
      const data = await this.getData()
      const parsedData = JSON.parse(data)
      const idActualizar = parsedData.find(
        (producto) => producto.id === id
      )
      if (idActualizar) {      
        const index = parsedData.indexOf(idActualizar)
        const valorActual = parsedData[index]
        const currentProducts = valorActual['products']
        currentProducts.push(objectToAdd.products)
        
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData))
        return true
      } else {
        console.log(`ID ${id} inexistente`)
        return false
      }

    } catch (error) {
        console.log(error)
    }
    } else {
      return false
    }
  }

  async removeFromArrayById(id, objectToRemoveId, keyName) {
    try {
      id = Number(id)
      const data = await this.getData()
      const parsedData = JSON.parse(data)
      
      const idActualizar = parsedData.find(
        (producto) => producto.id === id
      )
      
      if (idActualizar) {
        const index = parsedData.indexOf(idActualizar)
        
        const valorActual = parsedData[index][keyName]
        let indexToBeRemoved = -1
        valorActual.forEach((element, indexE) => {
          if(element.id == objectToRemoveId) {
            indexToBeRemoved = indexE
          }
        })
        const newArray = [...valorActual]
        
        if (indexToBeRemoved>-1) {
          console.log(indexToBeRemoved)
          newArray.splice(indexToBeRemoved,1)
        }
    
        parsedData[index][keyName] = newArray
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData))
        return true
      } else {
        console.log(`ID ${id} inexistente`)
        return false
      }

    } catch (error) {
        console.log(error)
    }
  
  }

  async save(object) {    
    if(this.validarObjeto(object)) {
      try {
        const allData = await this.getData()
        const parsedData = JSON.parse(allData)
  
        object.id = parsedData.length + 1
        parsedData.push(object)
  
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData))
        return object.id
      } catch (error) {
        console.log(error)
      }
    } else {
      return false
    }
    
  }

  async deleteAll() {
    try {
      await this.crearArchivo()
    } catch (error) {
        console.log(error)
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this._filename, "utf-8")
    return data
  }

  async getAll() {
    const data = await this.getData()
    return JSON.parse(data)
  }
}

module.exports = Contenedor