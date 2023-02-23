import mongoose from 'mongoose';

import {CourseModel} from '../models/course';
import { Course, DatabaseCourse } from '../../interfaces/course';
import { collections } from '../conn';

class CourseDao {
    constructor() {}
    //TODO: CACHING

    public async createCourse(course: DatabaseCourse) {
        const collection = collections.courses;
        collection.insertOne(course);
    }

    public async getCourseByEmail(email: string) {
        const collection = collections.courses;
        const courseFound = collection.findOne({email: email});
        return courseFound; 
    }

    public async getCourseById(id: string) {
        const collection = collections.courses;
        const courseFound = await collection.findOne({_id: new mongoose.Types.ObjectId(id)});
        return courseFound;
    }

    public async getCourses() {
        const collection = collections.courses;
        const courses = await collection.find().toArray();
        return courses;
    }
        
    public async updateCourse(course: Course) {
        CourseModel.findOne(data => {
            return data._id === course._id;
        }).then((courseFound) => {
            if (courseFound) {
                courseFound.name = course.name;
                courseFound.startTime = course.startTime;
                courseFound.duration = course.duration;
                courseFound.teacher = course.teacher;
                courseFound.studentsAmount = course.studentsAmount;
                courseFound.save();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    public async deleteCourse(id: string) {
        CourseModel.findOne(data => {
            return data._id === id;
        }).then((courseFound) => {
            if (courseFound) {
                courseFound.delete();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

}

export {CourseDao};