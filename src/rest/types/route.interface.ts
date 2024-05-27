import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from '../../shared/types/http-method.enum';
import { Middleware } from '../middleware/middleware.interface';

export interface Route {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
