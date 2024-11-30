import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppDataSource from './db/data-source';
import { errors } from 'celebrate';
import AppError from './shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import routes from './shared/routes/routes';

const app = express();


app.options('*', cors())

app.use(cors({
  origin: 'https://pontosidi.netlify.app/', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, etc.)
}));



app.use(express.json());

app.use('/', routes);

app.use(errors());


app.use(
  (error: unknown, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }
);

// Initialize DataSource and start server
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the Database');

    const port = process.env.PORT || 3000;  // Use port from .env or fallback to 3000
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);  // Exit the process if DB connection fails
  });
