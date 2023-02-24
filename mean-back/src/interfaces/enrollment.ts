export interface Enrollment {
    _id: string;
    id: string;
    studentId: string;
    courseId: string;
    grade: number | null;
    enrollmentDate: Date;
    finishDate: Date | null;
    enrollerId: string;
}

export type DatabaseEnrollment = Omit<Enrollment, '_id'>;