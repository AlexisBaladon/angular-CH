import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, LoginUser, RegisterUser } from '../interfaces/user';

//const usersDAO = new UsersDAO()

type UserAuth = (User & {refreshToken: string});
let users: UserAuth[] = [
  {email: "m1", password:"p1", refreshToken: ""},
  {email: "m2", password:"p2", refreshToken: ""}, //TODO: ENCRIPTAR CONTRASEÑAS
]

class AuthController {

  public async signup(req, res) {
    //Check user with same email in DB
    const user: RegisterUser = req.body;    
    if (!user) return res.sendStatus(400);
    const foundUser = users.find((u) => u.email === user.email);
    if (foundUser) return res.sendStatus(409);

    //Save user in DB
    const otherUsers = users.filter((u) => u.email !== user.email);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: UserAuth = { email: user.email, password: hashedPassword,  refreshToken: "" };
    users = [ ...otherUsers, newUser ];
    res.sendStatus(200);
  }

  public async login(req, res) {
    
    const user: LoginUser = req.body;
    if (!user) return res.sendStatus(400);
    //Check user in DB
    const foundUser = users.find((u) => {
      return u.email === user.email;
    });
    if (!foundUser) return res.sendStatus(401);

    const passwordsMatch = await bcrypt.compare(user.password, foundUser.password);
    if (!passwordsMatch) return res.sendStatus(401);

    //Generate tokens
    const accessToken = _generateAcessToken(user);
    const refreshToken = _generateRefreshToken(user);

    //Save refresh token in DB
    const otherUsers = users.filter((u) => u.email !== user.email);
    const currentUser = { ...foundUser, refreshToken };
    users = [ ...otherUsers, currentUser ];

    //Send tokens
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).json({ accessToken })
  }
  
  public logout(req, res) {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) return res.sendStatus(401);
    const logoutUser = users.find((u) => u.refreshToken && u.refreshToken === refreshToken);
    if (!logoutUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      return res.sendStatus(403);
    }

    const otherUsers = users.filter((u) => u.email !== logoutUser.email);
    users = [ ...otherUsers, { ...logoutUser, refreshToken: "" } ];

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(200);
  }

  public refreshToken(req, res) {
    //Verify refresh token in DB
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) return res.sendStatus(401);
    const foundUser = users.find((u) => u.refreshToken && u.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403);

    //Verify refresh token with jwt
    jwt.verify(
      refreshToken, 
      process.env.ACCESS_SECRET_REFRESH_TOKEN, 
      (err, user) => {
        if (err || foundUser.email !== user.email) return res.sendStatus(403);
        //Generate new access token and send
        const accessToken = _generateAcessToken(user);
        res.json({ accessToken });
      }
    )
  }
  
  public dogs(req, res) {
    const perros = ["wow", "wawawa", "wiwiwi"];
    res.status(200).json({ perros: perros });
  }

}

const _generateAcessToken = (user) => {
  return jwt.sign(
    {email: user.email},
    process.env.ACCESS_SECRET_TOKEN,
    { expiresIn: '15s' } //TODO: 5MIN IN PRODUCTION
  );
}

const _generateRefreshToken = (user) => {
  return jwt.sign(
    {email: user.email},
    process.env.ACCESS_SECRET_REFRESH_TOKEN, 
    {expiresIn: '1d'}
  );
}

export default AuthController;
