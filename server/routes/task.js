const routes = require (`express`).Router()
const Controller = require (`../controllers/task`)

routes.get(`/task`,Controller.search)
routes.get(`/task/:id`,Controller.searchById)
routes.post(`/task`, Controller.add)
routes.put(`/task/:id`, Controller.update)
routes.delete(`/task/:id`, Controller.delete)


module.exports = routes