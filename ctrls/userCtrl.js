const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = require('../config/env.config');
const db = require('../config/db.config');


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

    names: (req, res) => {
        console.log("---userId--- ", req.userId);
        db.one("SELECT * FROM users WHERE pk=$1", [req.userId])
            .then((user) => {

                res.status(200).json({ message: 'Successfully found user!', user });
            })
            .catch((error) => {
                console.log("users login 500 ", error);

                res.status(204).json({message:'User not found!'})
                
            })
    },

    login: (req, res) => {
        const { user_name, password } = req.body;
        
        db.one("SELECT * FROM users WHERE user_name=$1 AND password=$2", [user_name, password])
            .then((user) => {
                const environment = process.env.NODE_ENV || 'development';
                const token = jwt.sign({
                    email: user.email,
                    userId: user.pk.toString()
                }, secret[environment].jwtSecret, { expiresIn: '1h' });

                res.status(200).json({ message: 'Successfully logged in!', token });
            })
            .catch((error) => {
                console.log(" users login 500 ", error);
                if(!error.received) {
                    res.status(204).json({ message:'User not found!', error });
                }
                
            })
    },

    registration: (req, res) => {
       // if(validateUser(req, res)) {

            db.one("INSERT INTO users (email, password, user_name, first_name, last_name) VALUES (${email}, ${password}, ${user_name}, ${first_name}, ${last_name}) RETURNING pk", req.body)
            .then((user) => {
                res.status(201).json({ message:'User created!', userId: user.pk });
            })
            .catch((error) => {
                console.log("registration error ", error);
                res.status(500).json({ message:'Internal Server Error!' });
            });
     //   }
    }
}