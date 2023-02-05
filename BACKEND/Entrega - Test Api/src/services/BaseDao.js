import logger from "../utils/loggers/Log4jsLogger.js"
import "../configs/db.config.js"

export class BaseDao {

    constructor() {
        this.logger = logger
        if (this.constructor === BaseDao) {
            throw new Error('Clase "BaseDao" no puedo ser instanciada')
        }
    }

    create() {
        throw new Error('Metodo create() debe estar implementado')
    }

    getAll() {
        throw new Error('Metodo getAll() debe estar implementado')
    }

    deleteById() {
        throw new Error('Metodo deleteById() debe estar implementado')
    }
}