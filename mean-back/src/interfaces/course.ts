export interface Course {
    _id: string;
    name: string;
    startTime: string;
    duration: string;
    teacher: string;
    studentsAmount: number;
}

export type DatabaseCourse = Omit<Course, '_id'>;
