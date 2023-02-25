import {StudentDao} from "../database/dao/studentDAO";

const studentDAO = new StudentDao();

class StudentController {

    public async createStudent(req: any, res: any) {
        const randomId = Math.random().toString(32).substring(2, 8); //for test purposes
        const student = { averageGrade: 0, ...req.body, id: randomId }

        const studentFound = await studentDAO.getStudentByEmail(student.email);
        if (!studentFound) {
            await studentDAO.createStudent(student).catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
            });
            res.status(200).json(student);
        } else {
            res.status(409).json({ message: "Student already exists" });
        }
    }

    public async getStudentById(req: any, res: any) {
        const { id } = req.params;

        const studentFound = await studentDAO.getStudentById(id);
        if (studentFound) {
            res.status(200).json(studentFound);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    }

    public async getStudentByEmail(req: any, res: any) {
        const { email } = req.body;

        const studentFound = await studentDAO.getStudentByEmail(email);
        if (studentFound) {
            res.status(200).json(studentFound);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    }

    public async getStudents(req: any, res: any) {
        const students = await studentDAO.getStudents()
        .then((students) => {
            if (students) {
                return students;
            }
            return null;
        }).catch((err) => {
            console.log(err);
            return null;
        });
        
        if (students) {
            res.status(200).json(students);
        } else {
            res.status(404).json({ message: "Students not found" });
        }
    }

    public async updateStudent(req: any, res: any) {
        const student = req.body;
        Object.assign(student, { id: req.params.id });
        try {
            await studentDAO.updateStudent(student);
            res.status(200).json({ message: "Student updated" });
        }
        catch {
            res.status(404).json({ message: "Student not found" });
        }
    }

    public async deleteStudent(req: any, res: any) {
        try {
            await studentDAO.deleteStudent(req.params.id);
            res.status(200).json({ message: "Student deleted" });
        }
        catch {
            res.status(404).json({ message: "Student not found" });
        }
    }
    
}

export {StudentController}

