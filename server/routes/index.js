const router = require(`express`).Router()
const userRoutes = require(`./user`)
const taskRoutes = require(`./task`)
const organizationRoutes = require(`./organization`)
const {authentication} = require(`../middlewares/auth`)


router.use(userRoutes)
router.use(authentication)
router.use(taskRoutes)
router.use(organizationRoutes)
module.exports = router