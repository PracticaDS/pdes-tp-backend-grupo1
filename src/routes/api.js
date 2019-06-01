import { Router } from 'express'

const router = Router()

router.get('/usuarios', async (req, res) => {
  const users = await req.context.models.User.find()
  return res.send(users)
})

router.get('/usuarios/:userId/fabricas', async (req, res) => {
    const users = await req.context.models.User.findById(req.params.userId)
    return res.send(users['factories'])
})


export default router
