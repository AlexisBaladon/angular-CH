import { Router } from 'express'

const router = Router()

router.get('*', (req, res) => {
  const { url, method } = req;
  res.status(404).json({
    error: -2, //TODO: ?
    description: `the route ${url} for method ${method} doesn't exist`
  });
})

export default router