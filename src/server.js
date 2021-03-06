const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./server/routes')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use('/', routes)

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.NODE_ENV === 'development' ?
  process.env.DEV_PORT :
  process.env.TEST_PORT

app.listen(port, () => {
  console.log(`http://localhost:${port}`) // eslint-disable-line no-console
})

module.exports = app
