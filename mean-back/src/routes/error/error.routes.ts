import { Router } from 'express'

const router = Router()

router.get('*', (req, res) => {
  const { url, method } = req;
  res.status(404).send({ message: `Route ${url} with method ${method} not found` })
})

export {router};