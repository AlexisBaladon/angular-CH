import * as mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    courseId: { type: String, required: true },
    grade: { type: Number, required: true },
    enrollmentDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    enrollerId: { type: String, required: true },
});

const EnrollmentModel = mongoose.model('Enrollment', EnrollmentSchema);

export {EnrollmentModel}