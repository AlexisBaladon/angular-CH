import {CourseDao} from "../database/dao/courseDAO";

const courseDAO = new CourseDao();

class CourseController {

    public async createCourse(req: any, res: any) {
        const randomId = Math.random().toString(32).substring(2, 8); //for test purposes
        const course = { ...req.body, id: randomId}

        await courseDAO.createCourse(course).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
        res.status(200).json(course);
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
        Object.assign(course, {id: req.params.id});
        try {
            await courseDAO.updateCourse(course);
            res.status(200).json({ message: "Course updated" });
        }
        catch {
            res.status(404).json({ message: "Course not found" });
        }
    }

    public async deleteCourse(req: any, res: any) {
        try {
            await courseDAO.deleteCourse(req.params.id);
            res.status(200).json({ message: "Course deleted" });
        }
        catch {
            res.status(404).json({ message: "Course not found" });
        }
    }
    
}

export {CourseController}

