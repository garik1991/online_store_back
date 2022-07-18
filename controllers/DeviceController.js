const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController{
    async create(req, res, next){
        try{
            let {name, price, typeId, brandId, info} = req.body

            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, typeId, brandId, img: fileName})

            return res.json(device)
        }catch(err){
            console.log(err)
            next(ApiError.internal(err.message))
        }

    }

    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        limit = limit || 9
        page = page || 1
        const offset = page * limit - limit
        let filter = {}

        brandId ? filter.brandId = brandId : null
        typeId ? filter.typeId = typeId : null
        const devices = await Device.findAndCountAll({where: filter, limit, offset})
        return res.json(devices)
    }

    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne({where: {id}, include: [{model: DeviceInfo, as: 'info'}]})
        return res.json(device)
    }
}

module.exports = new DeviceController()