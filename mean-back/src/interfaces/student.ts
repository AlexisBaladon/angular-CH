export interface Student {
    _id: string;
    email: string;
    name: string;
    direction: string;
    phone: string;
    profile: string;
}

export type DatabaseStudent = Omit<Student, '_id'>;