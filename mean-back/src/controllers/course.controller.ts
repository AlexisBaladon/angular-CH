import {CourseDao} from "../database/dao/courseDAO";

const courseDAO = new CourseDao();

class CourseController {

    public async createCourse(req: any, res: any) {
        const course = req.body;

        const courseFound = await courseDAO.getCourseByEmail(course.email);
        if (!courseFound) {
            await courseDAO.createCourse(course).catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
            });
            res.status(200).json({ message: "Course created" });
        } else {
            res.status(409).json({ message: "Course already exists" });
        }
    }

    public async getCourseById(req: any, res: any) {
        const { id } = req.params;

        const courseFound = await courseDAO.getCourseById(id);
        if (courseFound) {
            res.status(200).json(courseFound);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }

    public async getCourseByEmail(req: any, res: any) {
        const { email } = req.body;

        const courseFound = await courseDAO.getCourseByEmail(email);
        if (courseFound) {
            res.status(200).json(courseFound);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }

    public async getCourses(req: any, res: any) {
        const courses = await courseDAO.getCourses()
        .then((courses) => {
            if (courses) {
                return courses;
            }
            return null;
        }).catch((err) => {
            console.log(err);
            return null;
        });
        
        if (courses) {
            res.status(200).json(courses);
        } else {
            res.status(404).json({ message: "Courses not found" });
        }
    }

    

    public async updateCourse(req: any, res: any) {
        const course = req.body;
        const courseFound = await courseDAO.getCourseById(course._id);
        if (courseFound) {
            await courseDAO.updateCourse(course);
            res.status(200).json({ message: "Course updated" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }

    public async deleteCourse(req: any, res: any) {
        const courseFound = await courseDAO.getCourseById(req.body.id);
        if (courseFound) {
            await courseDAO.deleteCourse(req.body.id);
            res.status(200).json({ message: "Course deleted" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    
}

export {CourseController}

