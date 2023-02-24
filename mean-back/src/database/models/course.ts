import * as mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    credits: { type: Number, required: true },
    averageGrade: { type: Number, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true },
    startTime: { type: String, required: true },
    duration: { type: Number, required: true },
    teacher: { type: String, required: true },
    studentsAmount: { type: Number, required: true },
});

const CourseModel = mongoose.model('Course', CourseSchema);

export {CourseModel}