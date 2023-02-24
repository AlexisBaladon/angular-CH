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

    public async getCourseById(id: string) {
        const collection = collections.courses;
        const courseFound = await collection.findOne({id});
        return courseFound;
    }

    public async getCourses() {
        const collection = collections.courses;
        const courses = await collection.find().toArray();
        return courses;
    }
        
    public async updateCourse(course: Course) {
        const collection = collections.courses;
        await collection.updateOne({id: course.id}, {$set: course});
    }

    public async deleteCourse(id: string) {
        try {
          const collection = collections.courses;
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

export {CourseDao};