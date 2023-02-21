import {allowedOrigins} from './allowedOrigins';

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            //TODO: REMOVE !origin IN PRODUCTION
            callback(null, true);
        } else {
            
            console.log(origin)
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
}

export {corsOptions}