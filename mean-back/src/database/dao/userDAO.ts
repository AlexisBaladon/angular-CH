import mongoose from 'mongoose';

import {UserModel} from '../models/user';
import { RegisterUser, UserDatabase } from '../../interfaces/user';
import { collections } from '../conn';

class UserDao {
    constructor() {}
    //TODO: CACHING

    public async createUser(user: RegisterUser) {
        const collection = collections.users;
        collection.insertOne(user);
    }

    public async getUserByEmail(email: string) {
        const collection = collections.users;
        const userFound = collection.findOne({email: email});
        return userFound; 
    }

    public async getUserById(id: string) {
        const collection = collections.users;
        const userFound = await collection.findOne({_id: new mongoose.Types.ObjectId(id)});
        return userFound;
    }

    public async getUsers() {
        const collection = collections.users;
        const users = await collection.find().toArray();
        return users;
    }
        
    public async updateUser(user: UserDatabase) {
        UserModel.findOne(data => {
            return data._id === user._id;
        }).then((userFound) => {
            if (userFound) {
                userFound.email = user.email;
                userFound.name = user.name;
                userFound.password = user.password;
                userFound.save();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    public async deleteUser(id: string) {
        UserModel.findOne(data => {
            return data._id === id;
        }).then((userFound) => {
            if (userFound) {
                userFound.delete();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

}

export {UserDao};