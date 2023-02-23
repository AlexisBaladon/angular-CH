import {EnrollmentDao} from "../database/dao/enrollmentDAO";

const enrollmentDAO = new EnrollmentDao();

class EnrollmentController {

    public async createEnrollment(req: any, res: any) {
        const enrollment = req.body;

        const enrollmentFound = await enrollmentDAO.getEnrollmentByEmail(enrollment.email);
        if (!enrollmentFound) {
            await enrollmentDAO.createEnrollment(enrollment).catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
            });
            res.status(200).json({ message: "Enrollment created" });
        } else {
            res.status(409).json({ message: "Enrollment already exists" });
        }
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

    public async getEnrollmentByEmail(req: any, res: any) {
        const { email } = req.body;

        const enrollmentFound = await enrollmentDAO.getEnrollmentByEmail(email);
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
        const enrollmentFound = await enrollmentDAO.getEnrollmentById(enrollment._id);
        if (enrollmentFound) {
            await enrollmentDAO.updateEnrollment(enrollment);
            res.status(200).json({ message: "Enrollment updated" });
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    }

    public async deleteEnrollment(req: any, res: any) {
        const enrollmentFound = await enrollmentDAO.getEnrollmentById(req.body.id);
        if (enrollmentFound) {
            await enrollmentDAO.deleteEnrollment(req.body.id);
            res.status(200).json({ message: "Enrollment deleted" });
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    }
    
}

export {EnrollmentController}

