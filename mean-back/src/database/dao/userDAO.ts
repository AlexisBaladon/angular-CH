import { RegisterUser, UserDatabase } from '../../interfaces/user';
import { collections } from '../conn';

class UserDao {
    constructor() {}
    //TODO: CACHING

    public async createUser(user: RegisterUser & Omit<Partial<UserDatabase>, '_id'>) {
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
        const userFound = await collection.findOne({id: id});
        return userFound;
    }

    public async getUsers() {
        const collection = collections.users;
        const users = await collection.find().toArray();
        return users;
    }
        
    public async updateUser(user: UserDatabase) {
        const collection = collections.users;
        await collection.updateOne({id: user.id}, {$set: user});
    }

    public async deleteUser(id: string) {
        try {
          const collection = collections.users;
          const courseFound = await collection.findOne({id});
            if (courseFound) {
                collection.deleteOne({id});
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
      }

}

export {UserDao};