import {allowedOrigins} from "../config/allowedOrigins";

const corsCredentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
}

export {corsCredentials}