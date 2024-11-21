import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/students/student.route';

const app: Application = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());
// app Routes
app.use('/api/v1/students', StudentRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express app!');
});

// 404 error handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Route not found');
});

export default app;
