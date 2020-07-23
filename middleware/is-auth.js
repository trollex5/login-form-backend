const jwt = require('jsonwebtoken');
const secret = require('../config/env.config');

module.exports = {
    isAuth: (req, res, next) => {
        const authHeader = req.get('Authorization');
      //  console.log("WWWWWWWW++++@@@ ", authHeader);
        
        if(!authHeader) {
            return res.status(401)
                .json({ message: 'Not Authorized!' });
        }
        
        const token = authHeader.split(' ')[1];
        const environment = process.env.NODE_ENV || 'development';
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, secret[environment].jwtSecret);
        } catch (error) {
            
            return res.status(401)
                .json({ message: 'Token is Invalid!', error });
        }

        req.userId = decodedToken.userId;
        next();
    }
}