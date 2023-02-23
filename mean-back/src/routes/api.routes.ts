import { Router } from 'express';
import {router as authRoutes} from './auth/auth.routes';
import {router as errorRoutes} from './error/error.routes';
import {router as userRoutes} from './users/users.routes';
import {router as courseRoutes} from './courses/courses.routes';
import {router as studentRoutes} from './students/students.routes';
import {router as enrollmentRoutes} from './enrollments/enrollments.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/*', errorRoutes);

export {router};