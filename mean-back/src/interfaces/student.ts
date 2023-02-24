export interface Student {
    _id: string;
    id: string;
    email: string;
    name: string;
    surname: string;
    direction: string;
    phone: string;
    admissionDate: Date;
    averageGrade: number;
    career: string;
    pictureUrl: string;
}

export type DatabaseStudent = Omit<Student, '_id'>;