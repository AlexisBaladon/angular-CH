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

    public async getEnrollmentById(id: string) {
        const collection = collections.enrollments;
        const enrollmentFound = await collection.findOne({id});
        return enrollmentFound;
    }

    public async getEnrollments() {
        const collection = collections.enrollments;
        const enrollments = await collection.find().toArray();
        return enrollments;
    }
        
    public async updateEnrollment(enrollment: Enrollment) {
        const collection = collections.enrollments;
        await collection.updateOne({id: enrollment.id}, {$set: enrollment});
    }

    public async deleteEnrollment(id: string) {
        try {
            const collection = collections.enrollments;
            const courseFound = await collection.findOne({id});
            if (courseFound) {
                collection.deleteOne({id});
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}

export {EnrollmentDao};