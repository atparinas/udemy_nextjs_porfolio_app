const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa')


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