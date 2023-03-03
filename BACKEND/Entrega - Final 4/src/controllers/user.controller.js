import {UsuarioService} from '../services/usuario.service.js'


const usuarioService = UsuarioService.getInstance()

export async function logInView(req, res) {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/login', {status: false})
    }
}

export async function signUpView(req, res) {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/signup', {status: false})
    }
}

export async function signUp(req, res) {
    const { body } = req
    const newUser = await usuarioService.createUser(body)

    if (newUser) {
        res.status(200).json({"success": "Usuario agregado"})
    } else {
        res.status(400).json({"error": "Validar que el body matchee con el schema"})
    }

}

export async function logIn(req, res) {
    const {user, pass} = req.body
    const loggedUser = await usuarioService.loginUser({
        username: user,
        password: pass
    })

    if (loggedUser) {
        req.session.login=true
        res.redirect('/api/usuario')
    } else {
        req.session.login=false
        res.redirect('/api/usuario/login')
    }
}

export async function homeView(req, res) {
    res.render('pages/home', {status: req.session.login})
}

export async function logOutView(req, res) {
    if (!req.session.login) {
        res.redirect('/api/usuario')
    } else {
        req.session.destroy( (err) => {
            if (err) {
                res.json(err)
            } else {
                res.render('pages/logout', {status: false})
            }
        })
    }
}
