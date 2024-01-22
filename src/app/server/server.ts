import express, { Express } from 'express';
import { Services } from './services';
import { middleware } from './middleware';
import { routeIndex } from './routes';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const createServer = (services: Services): Express => {
  const server = express();
  const contextRoute = process.env.APP_CONTEXT_ROUTE as string;

  //server.get('/', middleware.redirectTo(contextRoute, services));
  server.get('*', middleware.cleanupUrl(services));

  const defaultMiddleware = [cookieParser(), compression()];

  defaultMiddleware.forEach((middleware) => {
    server.use(middleware);
  });

  server.use(contextRoute, routeIndex(services));

  server.use(middleware.errorHandler);
  return server;
};

export { createServer };
