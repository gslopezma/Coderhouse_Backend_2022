const {create} = require('domain')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080 //Escucha al puerto de process.env y si no encuentra, entonces al 8080. Por ej en DEV tomara 8080 y en prod tomara el que corresponda.

app.get('/')
app.get('/orgs/{orgs}/repos', () => {
    //	En este callback se ejecuta lo que quiero que se ejecute cuando se accede al 			//	/orgs/idOrganizacionQueLeMandan/repos
})

//Cuando alguien quiere hacer algo en mi endpoint suele tener 2 parametros: un request y una respuesta.
app.get('/', (req, res) => {
    req.send('bienvenido')
})

app.get('/users/:id') //Es porque se espera que al ir a la URL se le pase un identificador donde 			esta el :id, por ej /users/2 para el id=2

app.get('/users/:id'), (req, res) => {
    const { id } = req.params //Toma el id del parametro req.params.id en una variable "id"
    console.log(id) //Se ve por la terminal, y si en la URL pasaron 2 sera 2
    res.send('Prueba params') //Esto se muestra en la pagina.
}
//En la URL puedo poner queries, por ej "/users?cont=America&pais=Argentina" esta pasando por query el cont y pais. Desp en el codigo no es necesario definir la URL con queries:
app.get('/users', (req, res) => {
    const { cont, pais } = req.query
    console.log(cont, pais) //Siguiendo el ej seria "America Argentina"
    if (cont || pais) { //Aca la pag devuelve algo distinto si recibio el cont o pais, o no.
        res.send('Query enviado')
    } else {
        res.send('No se encontro un query')
    }
})


app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

//req.params es para recuperar parametros, req.query para los queries, req.body se usa para el metodo post/put y contienen la informacion usada para modificar o agregar a la base de datos.



/*Dada la constante const frase = 'Hola mundo como estan' realizar un server con API Rest usando node.js y express que contenga los sigs endpoints get:
1)'/api/frase' -> devuelve la frase en forma completa en un campo 'frase'.
2) '/api/letras/:num -> devuelve por numero de orden la letra dentro de esa frase (num 1 refiere a la primera letra), en un campo 'letra'
3) '/api/palabras/:num -> devuelve por numero de orden la palabra dentro de esa frase (num 1 refiere a la primera palabra), en un campo 'palabra'
*/

app.get('/api/frase', (req, res) => {
    res.send(frase)
})

app.get('/api/letras/:num', (req, res) => {
    const { num } = req.params
    try {
        let letra = frase[num - 1]
        res.send(letra)
    } catch (error) {
        res.send(error)
    }
})

app.get('/api/palabras/:num', (req, res) => {
    const { num } = req.params
    try {
        const array = frase.splir(' ')
        const palabra = array[num - 1]
        res.status(200).send(palabra) //Esto es para trabajar con status
    } catch (error) {
        res.status(400).send(error)
    }
})

/*1) Desarrollar un servidor que permita realizar la suma entre dos num utilizando tres rutas en estos formatos (Ej con num 5 y 6)
a) ruta get '/api/sumar/5/6
b) ruta get '/api/sumar?num1=5&num2=6
c) ruta get '/api/operacion/5+6
no hace falta validar los datos a sumar, se asumen correctos

2) implementar las rutas post, put, delete en la dir '/api' respondiendo 'ok' + (post/put/delete) segun corresponda.
Probar estas rutas con Postman verificando que responda lo correcto
*/

app.get('/api/sumar/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params
    const respuesta = Number(num1) + Number(num2)
    res.send(respuesta.toString()) //usando .send debo mandar un string
})

app.get('/api/sumar', (req, res) => {
    const { num1, num2 } = req.query
    const respuesta = Number(num1) + Number(num2)
    res.send(respuesta.toString())
})

app.get
app.post('/api', (req, res) => {
    res.send('Ok post')
})

app.put('/api', (req, res) => {
    res.send('Ok post')
})

app.delete('/api', (req, res) => {
    res.send('Ok post')
})

/* Dada 'Frase inicial' realizar una app de servidor node.js con express que incorpore:
1) GET '/api/frase': devuelve un objeto que como campo 'frase' contenga la frase completa
2) GET '/api/palabras/:pos': devuelve un objeto que como campo 'buscada' contenga la palabra hallada en la frase en la posicion dada (considerar que la 1º palabra es la #1)
3) POST '/api/palabras': recibe un objeto con una palabra bajo el campo 'palabra' y la agrega al final de la frase.
devuelve un objeto que como campo 'agregada' contenta la palabra agregada y en el campo 'pos' la posicion en que se agrego.
4) PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo 'palabra' y reemplaza en la frase aquella hallada en la posicion dada.
Devuelve un objeto que como campo 'actualizada' contenga la nueva palabra, y en el campo 'anterior' la anterior
5) Delete '/api/palabras/:pos': elimina una palabra en la frase segun la pos. (1º palabra en la posicion 1)
*/

let frase = 'Hola mundo como estan'
/*Para que nuestro servidor pueda interpretar mensajes del tipo JSON en formato urlencoded
al recibirlos, debemosd indicarlo explicitamente agregando las sigs lineas: */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//{extended:true} precisa que el objeto req.body contendra valores de cualquier tipo en lugar de solo caracteres. Sin esta linea el server no sabra como interpretar los objs recibidos
//Esto va al principio con los otros app.use antes de las routes
app.get('/api/frase', (req, res) => {
    res.json({ frase })
})

app.get('/api/letras/:num', (req, res) => {
    const { num } = req.params
    try {
        let letra = frase[num - 1]
        res.send(letra)
    } catch (error) {
        res.send(error)
    }
})

app.get('/api/palabras/:num', (req, res) => {
    const { num } = req.params
    try {
        const array = frase.split(' ')
        const palabra = array[num - 1]
        res.status(200).json({ buscadas: palabra })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body
    const array = frase.split(' ')
    array.push(palabra)
    frase = array.join(' ')
    res.json({
        agregada: palabra,
        pos: array.length
    })
})

app.put('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const { palabra } = req.body
    const array = frase.split(' ')
    const palabraEliminada = array[pos - 1]
    array[pos - 1] = palabra
    frase = array.join(' ')
    console.log(frase)

    res.json({
        actualizada: palabra,
        anterior: palabraEliminada
    })
})

app.delete('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const array = frase.split(' ')
    const palabraEliminada = array[pos - 1]
    array.splice(pos - 1, 1)
    frase = array.join(' ')
    console.log(frase)
    res.json({ palabraEliminada })
})

/*Puedo tener muchos endpoints que sean /productos o como en el ej anterior /palabras. para eso sirven las rutas (routes)
Creo una carpeta routes donde pongo "palabras.js" y ahi tengo todos los llamados a /api/palabras
Es mas prolijo y facil de revisar.
*/

const {Router} = require('express')

const router = Router()

router.get
router.post
router.put
router.delete

module.exports = router

/*Luego en mi codigo principal lo llamaria al principio con
const palabrasRoutes = require('./routes/palabras.js') al principio para especificar el archivo con la ruta de palabras
app.use('/api/palabras', palabrasRoutes) para especificar que ruta usar cuando reciba que url, en este caso /api/palabras
De esta forma digo que cada vez que se pase /api/palabras se utilizara las rutas de palabras.js en la carpeta ./routes (en este ejemplo)
Los app.get app.post y demas definidos antes estarian definidos en palabras.js usando router.get router.post etc, y la url no hace falta especificar /api/palabras porque ya viene dado al definir esta ruta.
Entonces si el app.post era /api/palabras/:num, router.post seria /:num
*/


//Si creo una carpeta public y meto los archivos que quiero que se accedan sin restriccion, ej un html

app.use(express.static(__dirname+'/public'))
//Esto permite mostrar todos los archivos public en la carpeta public.


/* los middleware se pueden usar para restringir el acceso segun el usuario. Puedo por ej ponerlo a nivel app entera, o una route especifica, o un comando dentro de una ruta*/

//app.delete('/api/palabras/:pos', middleware, (req, res)
//En este caso seria para el DELETE en la ruta /api/palabras donde el middleware aplica

//npm i morgan para instalar el middleware morgan. Luego lo pongo al principio:
const morgan = require('morgan')
app.use(morgan('dev'))

//morgan muestra en la terminal todas las peticiones que se hacen al servidor y el status de la misma (200 exito por ej)
//creo un middleware
function primerMiddleware(req,res,next){
    console.log('mi primer middleware')
    next()
}

router.get('/',primerMiddleware,(req,res)=> {
    res.json({personas})
})

//Esto mostrara "mi primer middleware" al ejecutar el get del router en el que se agrego el middleware (personas en este ej). No en otros lugares porque solo lo estoy utilizando en este get

function segundoMiddleware(req,res,next){
    if(req.body.nombre ==="Fede"){
        return res.send('No se puede crear a esta persona')
    }
    console.log(req.body)
    next()
}

//Activando ese middleware en un POST por ej, si el nombre es "Fede" no va a crear a la persona, ya que ira al return y no ira nunca al next donde se hace el post en si

/*<h1>PRIMER ARCHIVO ESTATICO</h1>
    <form action="/personas" method="post" enctype="multipart/form-data">
        <input type="text" name="nombre" id="nombre">
        <input type="text" name="apellido" id="apellido">
        <input type="text" name="edad" id="edad">
        <input type="submit" value="INGRESA UNA PERSONA">
        <input type="file" name="fileMulter" id="fileMulter">
    </form>
    Eso es un form del HTML, fileMulter es para cartar archivos, y enctype="multipart/form-data" es un metodo necesario para permitir cargar los archivos
    
    En mi codigo tendria:
    const multer = require('multer')

    app.use(multer{
        dest:__dirname+'public'
    }.single('fileMulter'))
    
    el single es un unico archivo, para varios archivos seria array('fileMulter,10) el 2º parametro (10) siendo el maximo de archivos para cargar
    */