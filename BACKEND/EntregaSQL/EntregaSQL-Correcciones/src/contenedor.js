import { knex } from '../db.js'

class Contenedor {
  constructor(tabla) {
    this.tabla = tabla
    this.id = 'id'
    }
  
  async save(object) {
    try {
        const newProductId = await knex.insert(object).from(this.tabla);        
        console.log(`Producto agregado con ID: ${newProductId}.`);
        return newProductId;
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
}

async deleteById(id) {
    try {
        await knex.del().from(this.tabla).where(this.id, id);
        console.log('Producto borrado.');
        return true;
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
}

async getAll() {
    try {
        return await knex.select().from(this.tabla);
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
}

async getProductById(id) {
    try {
        return await knex.select().from(this.tabla).where(this.id, id);
    } catch (error) {
        console.log('Producto no encontrado');
    } 
    
}

async updateProductById(object, id) {
    try {
        await knex.from(this.tabla).update(object).where(this.id, id)
        return true;
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
}
}

module.exports = Contenedor