export interface Enrollment {
    _id: string;
    name: string;
    studentId: string;
    courseId: string;
    enrollmentDate: Date;
    enrollerId: string;
}

export type DatabaseEnrollment = Omit<Enrollment, '_id'>;