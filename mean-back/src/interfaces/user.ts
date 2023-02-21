interface User {
    email: string;
    password: string;
};

interface LoginUser extends User {}

interface RegisterUser extends User {
    name: string;
}

interface UserDatabase extends RegisterUser {
    _id: string;
}

export {
    LoginUser,
    RegisterUser,
    UserDatabase,
    User,
}