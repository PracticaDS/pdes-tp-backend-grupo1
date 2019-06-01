import app from './src/server'
import { connectDb } from './src/models'

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 3001

connectDb().then(async () => {
  app.listen(port, () =>
    console.log(`Server running on port ${port}!`)
  )
})
