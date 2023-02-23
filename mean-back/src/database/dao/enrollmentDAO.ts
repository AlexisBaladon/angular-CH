import mongoose from 'mongoose';

import {EnrollmentModel} from '../models/enrollment';
import { DatabaseEnrollment, Enrollment } from '../../interfaces/enrollment';
import { collections } from '../conn';

class EnrollmentDao {
    constructor() {}
    //TODO: CACHING

    public async createEnrollment(enrollment: DatabaseEnrollment) {
        const collection = collections.enrollments;
        collection.insertOne(enrollment);
    }

    public async getEnrollmentByEmail(email: string) {
        const collection = collections.enrollments;
        const enrollmentFound = collection.findOne({email: email});
        return enrollmentFound; 
    }

    public async getEnrollmentById(id: string) {
        const collection = collections.enrollments;
        const enrollmentFound = await collection.findOne({_id: new mongoose.Types.ObjectId(id)});
        return enrollmentFound;
    }

    public async getEnrollments() {
        const collection = collections.enrollments;
        const enrollments = await collection.find().toArray();
        return enrollments;
    }
        
    public async updateEnrollment(enrollment: Enrollment) {
        EnrollmentModel.findOne(data => {
            return data._id === enrollment._id;
        }).then((enrollmentFound) => {
            if (enrollmentFound) {
                enrollmentFound.name = enrollment.name;
                enrollmentFound.studentId = enrollment.studentId;
                enrollmentFound.courseId = enrollment.courseId;
                enrollmentFound.enrollmentDate = enrollment.enrollmentDate;
                enrollmentFound.enrollerId = enrollment.enrollerId;
                enrollmentFound.save();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    public async deleteEnrollment(id: string) {
        EnrollmentModel.findOne(data => {
            return data._id === id;
        }).then((enrollmentFound) => {
            if (enrollmentFound) {
                enrollmentFound.delete();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

}

export {EnrollmentDao};