const socketClient = io()

const agregarProd = document.getElementById('agregarProd')
const prodNombre = document.getElementById('nombre')
const prodPrecio = document.getElementById('precio')
const prodFoto = document.getElementById('foto')

const formulario = document.getElementById('formulario')
const inputNombre = document.getElementById('name')
const inputInfo = document.getElementById('info')
const lista = document.getElementById('lista')

formulario.onsubmit = (e) => {
    e.preventDefault()
    const msnInfo = inputInfo.value
    const msnNombre = inputNombre.value
    const obj = { msnNombre, msnInfo }
    socketClient.emit('mensaje', obj)
    inputInfo.value = ''
}

agregarProd.onsubmit = (e) => {
    e.preventDefault()
    const nombre = prodNombre.value
    const precio = prodPrecio.value
    const foto = prodFoto.value
    const obj = { nombre, precio, foto }
    socketClient.emit('prodAgregado', obj)
}

socketClient.on('mensajesArray', mensajesArray => {
    console.log(mensajesArray)
    generarTexto(mensajesArray)
})

socketClient.on('mensajeBienvenida', msn => {
    generarTexto(msn)
})

socketClient.on('listarProds', body => {
    const tabla = document.getElementById('tablaProds').getElementsByTagName('tbody')[0]
    const newRow = tabla.insertRow(-1);
    const celdaNombre = newRow.insertCell(0)
    const celdaPrecio = newRow.insertCell(1)
    const celdaFoto = newRow.insertCell(2)
    celdaNombre.innerHTML = body.nombre
    celdaPrecio.innerHTML = body.precio
    celdaFoto.innerHTML = `<img src=\"${body.foto}\" width=\"40\" height=\"50\" />`
    console.log (body)
    })

socketClient.on('listaBienvenida', prods => {
    const tabla = document.getElementById('tablaProds').getElementsByTagName('tbody')[0]
    prods.forEach ( data => {
        const newRow = tabla.insertRow(-1)
        const celdaNombre = newRow.insertCell(0)
        const celdaPrecio = newRow.insertCell(1)
        const celdaFoto = newRow.insertCell(2)
        celdaNombre.innerHTML = data.nombre
        celdaPrecio.innerHTML = data.precio
        celdaFoto.innerHTML = `<img src=\"${data.foto}\" width=\"40\" height=\"50\" />`
    })
    
})

function generarTexto(mensajes) {
    const inner = mensajes.map(mensaje => {
        return (`<li>${mensaje.msnNombre}: ${mensaje.msnInfo}</li><br>`)
    }).join(' ')
    lista.innerHTML = inner
}