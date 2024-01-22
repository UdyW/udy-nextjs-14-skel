import { redirectTo } from './redirectTo';
import { cleanupUrl } from './cleanupUrl';
import { errorHandler } from './errorHandler';

const middleware = {
  redirectTo,
  cleanupUrl,
  errorHandler,
};

export { middleware };
