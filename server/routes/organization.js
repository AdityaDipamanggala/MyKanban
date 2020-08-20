const routes = require (`express`).Router()
const Controller = require (`../controllers/user`)

routes.post(`/user-add-organization`, Controller.userOrganization)
routes.post(`/organization`, Controller.organization)
routes.delete(`/organization/:id`, Controller.organizationDelete)


module.exports = routes