import { Router } from 'express';
import {EnrollmentController} from '../../controllers/enrollment.controller';

const router = Router();
const enrollmentController = new EnrollmentController();

router.get('/:id', enrollmentController.getEnrollmentById);
router.get('/', enrollmentController.getEnrollments);
router.post('/', enrollmentController.createEnrollment);
router.put('/:id', enrollmentController.updateEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);

export {router}