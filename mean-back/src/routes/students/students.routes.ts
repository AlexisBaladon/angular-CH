import { Router } from 'express';
import {StudentController} from '../../controllers/student.controller';

const router = Router();
const studentController = new StudentController();

router.get('/:id', studentController.getStudentById);
router.get('/', studentController.getStudents);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export {router}