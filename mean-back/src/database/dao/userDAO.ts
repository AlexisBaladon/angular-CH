import UserModel from '../models/user';
import { UserDatabase } from '../../interfaces/user';

class UserDao {
    constructor() {}
    //TODO: CACHING

    public async createUser(user: UserDatabase) {
        const newUser = new UserModel(user);
        newUser.save();
    }

    public async getUserByEmail(email: string) {
        const userFound = UserModel.findOne(data => {
            return data.email === email;
        })
        .then((userFound) => {
            if (userFound) {
                return userFound;
            }
        }).catch((err) => {
            console.log(err);
            return null;
        });

        return userFound;
    }

    public async getUserById(id: string) {
        const userFound = UserModel.findOne(data => {
            return data._id === id;
        })
        .then((userFound) => {
            if (userFound) {
                return userFound;
            }
            return null;
        }).catch((err) => {
            console.log(err);
            return null;
        });

        return userFound;
    }

    public async getUsers() {
        const foundUsers = UserModel.find((err, data) => {
            if (err) {
                console.log(err);
                return null;
            }
            return data;
        });
        
        return foundUsers;
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

export default UserDao;