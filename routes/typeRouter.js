const router = require('express').Router()
const TypeController = require('../controllers/TypeController')

router.post('/', TypeController.create)
router.get('/', TypeController.getAll)

module.exports = router