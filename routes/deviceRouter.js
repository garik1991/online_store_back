const router = require('express').Router()
const DeviceController = require('../controllers/DeviceController')

router.post('/', DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

module.exports = router