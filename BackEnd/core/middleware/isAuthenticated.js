const jwt = require('jsonwebtoken')

const authMiddleware = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenValue) => {
        //console.log(tokenValue.user)
        if(err)
            return res.sendStatus(403);

        req.user = tokenValue.user;
        next();
    });    
}

module.exports = authMiddleware