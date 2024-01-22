import { logger } from './logger';

export type Services = {
  logger: typeof logger;
};

const services: Services = {
  logger,
};

export { services };
