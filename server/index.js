const express = require('express')
const next = require('next')

const routes = require('../routes');

const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app);

const secretData = [
    { title: 'Secret Data 1', description: 'Build hyperdrive'},
    { title: 'Secret Data 2', description: 'Search for Dark Matter'}
]

app.prepare()
.then(() => {
  const server = express()

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
        return res.json(secretData);
    })

    server.get('/api/v1/owneronly', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
      console.log(req.user)
      return res.json(secretData)
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.status(401).send('invalid token...');
        }
    })

    server.use(handle).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})