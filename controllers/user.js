const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = require('../config/env.config');
const app = require('../app');

function validateUser(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({
            messages: 'Validation errors!',
            errors: errors.array()
        })

        return false;
    }

    return true;
}


module.exports = {
    names: async (msg) => {
        console.log("---userId--- ", msg.userId);
        try {
            const user = await app.models.user.getById(msg.userId);
            return {
                code: 'found',
                message: 'Successfully found user!',
                user
            };
        } catch (error) {
            console.log("users login 500 ", error);

            return {
                code: 'notFound',
                message:'User not found!'
            };
        }
    },
    login: async (msg) => {
        const { user_name, password } = msg;

        try {
            const user = await app.models.user.checkLogin(user_name, password);
            const environment = process.env.NODE_ENV || 'development';
            const token = jwt.sign({
                email: user.email,
                userId: user.pk.toString()
            }, secret[environment].jwtSecret, { expiresIn: '1h' });

            return {
                code: 'success',
                message: 'Successfully logged in!',
                token
            };
        } catch (error) {
            console.log(" users login 500 ", error);
            if(!error.received) {
                return {
                    code: 'fail',
                    message:'User not found!',
                    error
                };
            }
        }
    },
    registration: async (msg) => {
        try {
            const user = await app.models.user.create(msg);
            return { 
                code: 'success',
                message:'User created!',
                userId: user.pk
            };
        } catch (error) {
            console.log("registration error ", error);
            return {
                code: 'fail',
                message:'Internal Server Error!',
                error
            };
        }
    }
}