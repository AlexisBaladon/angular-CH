import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader &&
                    (authHeader.length > 2) &&
                    authHeader.split(' ')[1] //Bearer {token}
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

export default authenticateToken;