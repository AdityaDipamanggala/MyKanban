const routes = require (`express`).Router()
const Controller = require (`../controllers/user`)

routes.get(`/user`,Controller.showUser)
routes.post(`/login`,Controller.userLogin)
routes.post(`/register`,Controller.userCreate)
routes.post(`/googlesign`,Controller.googleSignIn)

// routes.post(`/user-add-organization`, Controller.userOrganization)
// routes.post(`/organization`, Controller.organization)


module.exports = routes