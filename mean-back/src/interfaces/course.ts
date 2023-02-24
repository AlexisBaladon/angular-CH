export interface Course {
    _id: string;
    id: string;
    name: string;
    description: string;
    credits: number;
    averageGrade: number | null;
    icon: string;
    category: string;
    startTime: string;
    duration: number;
    teacher: string;
    studentsAmount: number;
}

export type DatabaseCourse = Omit<Course, '_id'>;
