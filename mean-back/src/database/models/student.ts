import * as mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    direction: { type: String, required: true },
    phone: { type: String, required: true },
    profile: { type: String, required: true },
});

const StudentModel = mongoose.model('Student', StudentSchema);

export {StudentModel}