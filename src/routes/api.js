import { Router } from 'express'

const router = Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

router.get('/usuarios', async (req, res) => {
  const users = await req.context.models.User.find()
  return res.send(users)
})

router.get('/usuarios/:userName/fabricas', async (req, res) => {
  const users = await req.context.models.User.findOne({ username: req.params.userName })
  console.log(users)
  if (users) {
    return res.send(users['factories'])
  } else {
    return res.status(404).send('Not found')
  }
})

router.get('/usuarios/:userName/fabricas/:fabricaName', async (req, res) => {
  const users = await req.context.models.User.findOne({ username: req.params.userName })
  if (!users) {
    return res.status(404).send('Not found')
  }

  return res.send(users.factories.filter(factory => factory.name === req.params.fabricaName)[0])
})

router.post('/usuarios/:userName', async (req, res) => {
  const user = {
    username: req.params.userName,
    factories: []
  }
  req.context.models.User.create(user)
  return res.send(user)
})

router.post('/usuarios/:userName/fabricas', async (req, res) => {
  const user = await req.context.models.User.findOne({ username: req.params.userName })
  const factory = req.body
  user.factories.push({
    name: factory.name,
    state: {}
  })

  await req.context.models.User.updateOne({ username: req.params.userName }, user)
  return res.send(user)
})

router.put('/usuarios/:userName/fabricas/:fabricaName', async (req, res) => {
  const user = await req.context.models.User.findOne({ username: req.params.userName })
  const factories = user.factories.map(factory => {
    if (factory.name === req.params.fabricaName) {
      factory.state = req.body.state
    }
    return factory
  })

  await req.context.models.User.updateOne({ username: req.params.userName }, { factories: factories })
  return res.send(req.body)
})

export default router
