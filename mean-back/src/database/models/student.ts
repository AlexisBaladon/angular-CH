import * as mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    direction: { type: String, required: true },
    phone: { type: String, required: true },
    admissionDate: { type: Date, required: true },
    averageGrade: { type: Number, required: true },
    career: { type: String, required: true },
    pictureUrl: { type: String, required: true },
});

const StudentModel = mongoose.model('Student', StudentSchema);

export {StudentModel}