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
        const studentFound = await collection.findOne({id: id});
        return studentFound;
    }

    public async getStudents() {
        const collection = collections.students;
        const students = await collection.find().toArray();
        return students;
    }
        
    public async updateStudent(student: Student) {
        const collection = collections.students;
        collection.updateOne({id: student.id}, {$set: student});
    }

    public async deleteStudent(id: string) {
        try {
          const collection = collections.students;
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

export {StudentDao};