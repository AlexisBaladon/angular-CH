import mongoose from 'mongoose';

import {StudentModel} from '../models/student';
import { DatabaseStudent, Student } from '../../interfaces/student';
import { collections } from '../conn';

class StudentDao {
    constructor() {}
    //TODO: CACHING

    public async createStudent(student: DatabaseStudent) {
        const collection = collections.students;
        collection.insertOne(student);
    }

    public async getStudentByEmail(email: string) {
        const collection = collections.students;
        const studentFound = collection.findOne({email: email});
        return studentFound; 
    }

    public async getStudentById(id: string) {
        const collection = collections.students;
        const studentFound = await collection.findOne({_id: new mongoose.Types.ObjectId(id)});
        return studentFound;
    }

    public async getStudents() {
        const collection = collections.students;
        const students = await collection.find().toArray();
        return students;
    }
        
    public async updateStudent(student: Student) {
        StudentModel.findOne(data => {
            return data._id === student._id;
        }).then((studentFound) => {
            if (studentFound) {
                studentFound.email = student.email;
                studentFound.name = student.name;
                studentFound.direction = student.direction;
                studentFound.phone = student.phone;
                studentFound.profile = student.profile;
                studentFound.save();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    public async deleteStudent(id: string) {
        StudentModel.findOne(data => {
            return data._id === id;
        }).then((studentFound) => {
            if (studentFound) {
                studentFound.delete();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

}

export {StudentDao};