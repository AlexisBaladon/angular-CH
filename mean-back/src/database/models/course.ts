import * as mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    duration: { type: String, required: true },
    teacher: { type: String, required: true },
    studentsAmount: { type: Number, required: true },
});

const CourseModel = mongoose.model('Course', CourseSchema);

export {CourseModel}