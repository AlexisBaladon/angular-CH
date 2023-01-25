import UserDao from "../database/dao/userDAO";

const userDAO = new UserDao();

class UserController {

    public async createUser(req: any, res: any) {
        const user = req.body;
        const userFound = await userDAO.getUserByEmail(user.email);
        if (userFound) {
            res.status(409).json({ message: "User already exists" });
        } else {
            await userDAO.createUser(user);
            res.status(200).json({ message: "User created" });
        }
    }

    public async getUserById(req: any, res: any) {
        const userFound = await userDAO.getUserById(req.body.id);
        if (userFound) {
            res.status(200).json(userFound);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    public async getUserByEmail(req: any, res: any) {
        const userFound = await userDAO.getUserByEmail(req.body.email);
        if (userFound) {
            res.status(200).json(userFound);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    public async getUsers(req: any, res: any) {
        const users = await userDAO.getUsers()
        .then((users) => {
            if (users) {
                return users;
            }
            return null;
        }).catch((err) => {
            console.log(err);
            return null;
        });

        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "Users not found" });
        }
    }

    public async updateUser(req: any, res: any) {
        const user = req.body;
        const userFound = await userDAO.getUserById(user._id);
        if (userFound) {
            await userDAO.updateUser(user);
            res.status(200).json({ message: "User updated" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    public async deleteUser(req: any, res: any) {
        const userFound = await userDAO.getUserById(req.body.id);
        if (userFound) {
            await userDAO.deleteUser(req.body.id);
            res.status(200).json({ message: "User deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }
    
}

export default UserController;

