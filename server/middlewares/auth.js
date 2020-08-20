const jwt = require(`jsonwebtoken`)
const {User, Todo} = require (`../models`)

const authentication = (req,res,next) => {
    const {access_token} = req.headers
    if (!access_token) next({name: `TOKEN_ERROR`,message: `Invalid email or password`})
    try {
        let decode = jwt.verify(access_token,`secret_key`)
        req.userData = decode
        User.findByPk(req.userData.id)
        .then(data => {
            if (data) next()
            else next({name : `NOT_FOUND`, message: `Can't find user`})
        })
        .catch(err => next(err)) //res.status(401).json({message : err.message}))
    }
    catch (err) {next({name : `JWT_ERROR`, message: `Wrong Token`})}
    
    
}

const authorization = (req,res,next) => {
    const {id} = req.params
    Todo.findByPk(id)
    .then(data => {
        if (!data){
           next({name : `NOT_FOUND`,message : `Todo not with ID ${id} not found`}) //res.status(404).json({message: `Todo not found`})
        } 
        else if (data.UserId !== req.userData.id) next({name : `NOT_AUTHORIZED`, message : `You are not authorized to excecute the process`}) //res.status(403).json({message: `You're not authorized to do this`})
        else next()
    })
    .catch(err => next(err))//res.status(500).json({message : `Internal server error`}))
}

module.exports = {authentication,authorization}