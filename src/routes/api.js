import { Router } from 'express'

const router = Router()

router.get('/usuarios', async (req, res) => {
  const users = await req.context.models.User.find()
  return res.send(users)
})

export default router
