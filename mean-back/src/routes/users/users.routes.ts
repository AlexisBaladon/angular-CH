import { Router } from 'express';
import {UserController} from '../../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.get('/user/:id', userController.getUserById);
router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export {router}