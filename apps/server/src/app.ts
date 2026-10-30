import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes';
import { requestLogger, errorHandler } from './middleware';

const app = express();

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use(requestLogger);

// Routes
app.use('/api/profiles', profileRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
