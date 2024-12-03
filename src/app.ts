/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application,  Request, Response } from 'express';

import globalErrorHandler from './app/modules/Middlewares/globalErrorhandler';

import NotFound from './app/modules/Middlewares/NotFound';
import router from './app/routes';
const app: Application = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());
// app Routes
app.use('/api/v1', router);


// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express app!');
});
app.use(globalErrorHandler)
app.use(NotFound)

export default app;
