
import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import errorRoutes from './error/error.routes';
import userRoutes from './users/users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/', userRoutes);
router.use('/*', errorRoutes);

export default router;