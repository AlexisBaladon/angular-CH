import {allowedOrigins} from './allowedOrigins';

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
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