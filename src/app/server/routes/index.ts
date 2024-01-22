import { NextFunction, Router, Request, Response } from 'express';
import { Services, services } from '../services';
import { errorHandler } from '../middleware/errorHandler';

const routeIndex = (services: Services): Router => {
  const router = Router();

  router.get(['/'], (req: Request, res: Response, next: NextFunction) => {
    return next();
  });

  router.use(errorHandler);
  return router;
};

export { routeIndex };
