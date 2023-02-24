import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, required: true },
    direction: { type: String, required: true },
    phone: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

export {UserModel}