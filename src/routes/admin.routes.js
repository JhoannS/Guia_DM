const {Router} = require('express')
const router = Router()

const {isAuthenticated} = require('../helpers/auth')
const { renderAdmin } = require('../controllers/admin.controller')

router.get('/admin', isAuthenticated ,renderAdmin)

module.exports = router