import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './routes/api'
import { models } from './models'

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.context = { models }
  next()
})

app.use('/api', api)

app.get('/', (req, res) => {
  res.status(200).send('hello')
})

export default app
