interface User {
    email: string;
    password: string;
};

interface LoginUser extends User {}

interface RegisterUser extends User {
    username: string;
}

export {
    LoginUser,
    RegisterUser,
    User,
}