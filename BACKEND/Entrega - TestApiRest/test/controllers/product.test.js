const axios = require('axios')

test('[GET] api/productos/:non-existent-id retorna producto no encontrado', async() => {
    const nonExistentProductUrl = 'http://localhost:3031/api/productos/non-existent-id'

    const response = await axiosGet(nonExistentProductUrl)
    expect(response.status).toBe(400)
    expect(response.data).toHaveProperty('error', 'producto no encontrado')

})

test('[PUT] api/productos/:non-existent-id retorna producto no encontrado o body invalido', async() => {
    const nonExistentProductUrl = 'http://localhost:3031/api/productos/non-existent-id'
    const body = {}
    const response = await axiosPut(nonExistentProductUrl, body)
    expect(response.status).toBe(404)
    expect(response.data).toHaveProperty('error', 'producto no encontrado o body invalido.')

})

const axiosGet = async (url) => {
    let response
    try {
        response = await axios.get(url)
    } catch (err) {
        response = err.response
    }
    return response

}

const axiosPut = async (url, object) => {
    let response
    try {
        response = await axios.put(url, object)
    } catch (err) {
        response = err.response
    }
    return response

}


