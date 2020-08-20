const {User, UserOrganization, Organization} = require(`../models`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const { OAuth2Client } = require('google-auth-library');

class UserController {

    static showUser(req,res,next){
        User.findAll()
        .then(data => res.json(data))
        .catch(err => next(err))
    }
    
    static userCreate(req,res,next){
        let newUser = {
            name : req.body.name,
            email : req.body.email,// tambah email
            password : req.body.password,
            createdAt : new Date(),
            updatedAt : new Date()
        }

        User.create(newUser)
        .then(data => res.status(201).json({status : 201, message : `${data.email} successfuly added`}))
        .catch (err => {
            //console.log(err);
            next(err)// res.status(500).json({message : err.message})
        })
    }

    static userLogin(req,res,next){
        console.log("login");
        let user = {
            email : req.body.email,
            password : req.body.password
        }
        User.findOne({where : {email : user.email}})
        .then(data => {
            if (data && bcrypt.compareSync(user.password, data.password)){
                let access_token = jwt.sign({id: data.id,email: data.email},`secret_key`)
                res.status(200).json({access_token})
            }
            else next ({name : `INVALID_USER`, message : `Invalid Email or Password`})//res.status(400).json({message : `Invalid Username or Password`})
        })
        .catch(err => next(err))
    }

    static userOrganization(req,res,next){
        let userOrganization = {
            UserId : req.userData.id,
            OrganizationId : req.body.id
        }
        UserOrganization.create(userOrganization)
        .then(data => res.json({message : `Organization added to user`}))
        .catch(err => next(err))
    }

    static organization(req,res,next){
        let name = req.body.name
        console.log(name);
        let newOrganization = {
            name : req.body.name,
            createdAt : new Date(),
            updatedAt : new Date()
        }
        Organization.create(newOrganization)
        .then(data => res.json({message : `Organization has been added`}))
        .catch (err => res.json(err))
    }

    static organizationDelete(req,res,next){
        Organization.destroy({where : {id : req.params.id}})
        .then(data => res.json({message : `Organization berhasil dihapus`}))
        .catch (err => res.json(err))
    }

    static googleSignIn(req,res,next){
        let { id_token } = req.body
        let email = null
        const client = new OAuth2Client(process.env.CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            email = ticket.getPayload().email
                return User.findOne({
                    where: {
                        email
                    }
                })
        })
        .then(data => {
            if(data){
                let payload = {
                    id: data.id,
                    email: data.email
                }
                return payload
            }
            else{
                return User.create({
                    email, password: 'password'
                })
            }
        })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            let token = jwt.sign(payload, 'secret_key')
            // console.log(payload,token)
            return res.status(201).json({
                data: {
                    email : data.email,
                    id: data.id,
                    access_token: token
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = UserController