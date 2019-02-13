const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa')

const namespace = 'http://localhost:3000/'

//Middleware
exports.checkJWT = jwt({ 
    secret: jwksClient.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: 'https://parinas.au.auth0.com/.well-known/jwks.json',
    }),
    audience: 'xsH4HP9mFp91I0xbuPoxGUtS2AlUgh28',
    issuer: 'https://parinas.au.auth0.com/',
    algorithms: ['RS256']
})


exports.checkRole = role => (req, res, next) => {
    const user = req.user;

    if(user && user[namespace + 'role'] === role){
        next();
    }else {
        return res.status(401).send({title: 'not authorize'})
    }

}
