import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginUser, RegisterUser } from '../interfaces/user';
import {UserDao} from '../database/dao/userDAO';

const userDao = new UserDao();
//keep track of refresh tokens in memory

interface RefreshToken {
  email: string;
  refreshToken: string;
}

let refreshTokens: RefreshToken[] = []; 
class AuthController {

  public async signup(req, res) {
    const user: RegisterUser = req.body;
    if (!user) return res.sendStatus(400);
    const foundUser = await userDao.getUserByEmail(user.email);
    if (foundUser) return res.sendStatus(409);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newRefreshToken = { email: user.email, refreshToken: ""};
    const newUser: RegisterUser = { ...user, password: hashedPassword};
    refreshTokens.push(newRefreshToken);
    await userDao.createUser(newUser);
    res.sendStatus(200);
  }

  public async login(req, res) {
    
    const user: LoginUser = req.body;
    if (!user) return res.sendStatus(400);
    //Check user in DB
    const foundUser = await userDao.getUserByEmail(user.email);
    if (!foundUser) return res.sendStatus(401);

    const passwordsMatch = await bcrypt.compare(user.password, foundUser.password);
    if (!passwordsMatch) return res.sendStatus(401);

    //Generate tokens
    const accessToken = __generateAcessToken(user);
    const refreshToken = __generateRefreshToken(user);

    //Save refresh token in DB
    refreshTokens.push({ email: user.email, refreshToken });

    //Send tokens
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).json({ accessToken })
  }
  
  public logout(req, res) {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) return res.sendStatus(401);
    const logoutUser = refreshTokens.find((u) => u.refreshToken === refreshToken);
    if (!logoutUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      return res.sendStatus(403);
    }

    const otherUsers = refreshTokens.filter((u) => u.email !== logoutUser.email);
    refreshTokens = [ ...otherUsers, { ...logoutUser, refreshToken: "" } ];

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(200);
  }

  public refreshToken(req, res) {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) return res.sendStatus(401);
    const foundUser = refreshTokens.find((u) => u.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken, 
      process.env.ACCESS_SECRET_REFRESH_TOKEN, 
      (err, user) => {
        if (err || foundUser.email !== user.email) return res.sendStatus(403);
        const accessToken = __generateAcessToken(user);
        res.json({ accessToken });
      }
    )
  }  
}

const __generateAcessToken = (user) => {
  return jwt.sign(
    {email: user.email},
    process.env.ACCESS_SECRET_TOKEN,
    { expiresIn: '15s' } //TODO: 5MIN IN PRODUCTION
  );
}

const __generateRefreshToken = (user) => {
  return jwt.sign(
    {email: user.email},
    process.env.ACCESS_SECRET_REFRESH_TOKEN, 
    {expiresIn: '1d'}
  );
}
export {AuthController}
