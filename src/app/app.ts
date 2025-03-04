import express, { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import UserRouter from '../features/authentication/routes/route' 
import ErrorHandler from '../utils/Errorhandler';
import connect_pg from '../middleware/pg_connect' 
import cookieParser from 'cookie-parser';
import cors from 'cors'

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling(); 
    
  }
  
  private initializeMiddleware(): void {
    connect_pg.syncDatabase()
    this.app.use(cookieParser())
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: true,
      credentials: true,
    }));
    this.app.use(session({
      secret: process.env.SESSION_SECRET || '',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 6 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
      }
    }));
    
    
  }
  private initializeRoutes(): void {
    this.app.use('/api', UserRouter);
  }

  private initializeErrorHandling(): void {
    this.app.use((err:ErrorHandler, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
      });
    });
  }
}

export default new App().app;

