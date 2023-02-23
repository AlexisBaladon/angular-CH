import { Router } from 'express';
import {UserController} from '../../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.get('/:id', userController.getUserById);
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export {router}