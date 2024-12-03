/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, RequestHandler  } from 'express';

const NotFound : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'API not found',
      });
    };

export default NotFound;
