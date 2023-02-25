import {EnrollmentDao} from "../database/dao/enrollmentDAO";

const enrollmentDAO = new EnrollmentDao();

class EnrollmentController {

    public async createEnrollment(req: any, res: any) {
        const randomId = Math.random().toString(32).substring(2, 8); //for test purposes
        const enrollment = { ...req.body, id: randomId}
        await enrollmentDAO.createEnrollment(enrollment).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
        res.status(200).json(enrollment);
    }

    public async getEnrollmentById(req: any, res: any) {
        const { id } = req.params;

        const enrollmentFound = await enrollmentDAO.getEnrollmentById(id);
        if (enrollmentFound) {
            res.status(200).json(enrollmentFound);
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    }

    public async getEnrollments(req: any, res: any) {
        const enrollments = await enrollmentDAO.getEnrollments()
        .then((enrollments) => {
            if (enrollments) {
                return enrollments;
            }
            return null;
        }).catch((err) => {
            console.log(err);
            return null;
        });
        
        if (enrollments) {
            res.status(200).json(enrollments);
        } else {
            res.status(404).json({ message: "Enrollments not found" });
        }
    }

    public async updateEnrollment(req: any, res: any) {
        const enrollment = req.body;
        Object.assign(enrollment, {id: req.params.id});
        try {
            await enrollmentDAO.updateEnrollment(enrollment);
            res.status(200).json({ message: "Enrollment updated" });
        }
        catch {
            res.status(404).json({ message: "Enrollment not found" });
        }
    }

    public async deleteEnrollment(req: any, res: any) {
        try {
            await enrollmentDAO.deleteEnrollment(req.params.id);
            res.status(200).json({ message: "Enrollment deleted" });
        }
        catch {
            res.status(404).json({ message: "Enrollment not found" });
        }
    }
    
}

export {EnrollmentController}

