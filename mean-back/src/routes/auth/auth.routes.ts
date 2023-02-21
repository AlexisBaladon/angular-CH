import { Router } from 'express';
import {AuthController} from '../../controllers/auth.controller';
import {authenticateToken} from '../../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.post('/token', authController.refreshToken);

export {router}