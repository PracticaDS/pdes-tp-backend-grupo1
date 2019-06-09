import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './routes/api'
import { models } from './models'
import Prometheus from 'prom-client'

const requestCounter = new Prometheus.Counter({
  name: 'total_request_count',
  help: 'Cantidad de requests total'
})

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500]
  // buckets for response time from 0.1ms to 500ms
})

httpRequestDurationMicroseconds.observe(10)

const { collectDefaultMetrics } = Prometheus

collectDefaultMetrics({ timeout: 5000 })

const app = express()

app.use(morgan('dev'))

// Request counter
app.use((req, res, next) => {
  requestCounter.inc()
  next()
})

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

app.get('/prometheus', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(Prometheus.register.metrics())
})

// Runs after each requests
app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch

  httpRequestDurationMicroseconds
    .labels(req.method, req.route.path, res.statusCode)
    .observe(responseTimeInMs)

  next()
})

export default app
