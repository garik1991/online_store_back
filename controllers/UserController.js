const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.internal('Incorrect data'))
        }
        const candidate = await User.findOne({where: {email}});
        if(candidate){
            return next(ApiError.internal('User with such email already exists'))
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashedPassword, role})
        const basket = await Basket.create({basketId: basket.id})
        const jwt = jwt.sign({id: user.id, email: user.email, role: user.role})
    }

    async login(req, res){

    }

    async auth(req, res, next){

    }
}

module.exports = new UserController()