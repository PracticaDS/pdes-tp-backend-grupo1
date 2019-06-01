import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send('hello')
})

export default app
