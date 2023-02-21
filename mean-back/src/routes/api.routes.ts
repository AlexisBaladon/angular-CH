import { Router } from 'express';
import {router as authRoutes} from './auth/auth.routes';
import {router as errorRoutes} from './error/error.routes';
import {router as userRoutes} from './users/users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/', userRoutes);
router.use('/*', errorRoutes);

export {router};