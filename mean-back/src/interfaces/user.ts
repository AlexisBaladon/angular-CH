interface User {
    email: string;
    password: string;
};

interface LoginUser extends User {}

interface RegisterUser extends User {
    name: string;
    surname: string;
}

interface UserDatabase extends RegisterUser {
    _id: string;
    id: string;
    profile: 'user' | 'admin';
    direction: string;
    phone: string;
}

export {
    LoginUser,
    RegisterUser,
    UserDatabase,
    User,
}