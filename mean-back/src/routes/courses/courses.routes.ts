import { Router } from 'express';
import {CourseController} from '../../controllers/course.controller';

const router = Router();
const courseController = new CourseController();

router.get('/:id', courseController.getCourseById);
router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export {router}