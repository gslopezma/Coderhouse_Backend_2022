import { dbSQL } from '../config.js'
import { dbSQLite } from '../config.js'

;(async function () {
    try {
        const isTable = await dbSQL.schema.hasTable('products');
        if(isTable) {
            console.log('La tabla <products> ya existe creada en la DB')
        } else {
            await dbSQL.schema.createTable('products', (table) => {
                table.increments('id').primary().notNullable(),
                table.string('nombre', 100).notNullable(),
                table.float('precio').notNullable(),
                table.string('url', 400)
            })
            console.log('La tabla <products> ha sido creada')
        }
    } catch (error) {
        console.log(error);
    }
})()
;(async function () {
    try {
        const isTable = await dbSQLite.schema.hasTable('chat');
        if (isTable) {
            console.log('La tabla <chat> ya existe creada en la DB')
        } else {
            await dbSQLite.schema.createTable('chat', (table) => {
                table.increments('id').primary().notNullable(),
                table.string('usuario', 100).notNullable(),
                table.string('mensaje', 500).notNullable()
            })
            console.log('La tabla <chat> ha sido creada')
        }
    } catch (error) {
        console.log(error);
    }
})()