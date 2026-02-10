import './config/envConfig';
import './config/dbConfig';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from "./utils/logger";

//import routes
import appRoute from "./api/routes/app.route";
import userRoute from "./api/routes/users.route";
import { envConfig } from './config/envConfig';

const app: Application = express();
const PORT = process.env.PORT || 6001;

// Middlewares
app.use(cors({
  origin: `${envConfig.BASE_URL}`, // frontend URL
  credentials: true, // allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1', appRoute); // Health routes
app.use('/api/v1/user', userRoute); // User routes

// start application
app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
    logger.info(`User Service is running on port ${PORT}`);
});

export default app;