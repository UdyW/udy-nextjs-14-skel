import { Request, Response } from 'express';
import type { Services } from '../services';

const redirectTo =
  (redirectUrl: string, services: Services) =>
  (_req: Request, res: Response): void => {
    services.logger.debug(`redirectTo:: redirecting to ${redirectUrl}`);
    res.redirect(301, redirectUrl);
  };

export { redirectTo };
