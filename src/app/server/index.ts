import next from 'next';
import express from 'express';
import { Request, Response } from 'express';
import { isDevelopment } from './utils/environment';
import { services } from './services';
import { createServer } from './server';
import { parse } from 'url';

const app = next({ dev: isDevelopment() });

const handle = app.getRequestHandler();

const contextRoute = process.env.APP_CONTEXT_ROUTE as string;

app
  .prepare()
  .then(() => {
    services.logger.debug('server index::creating the server');
    try {
      const server = createServer(services);

      services.logger.debug('server index::server running');

      server.get(`*`, (req: Request, res: Response) => {
        const parsedUrl = parse(req.url, true);

        services.logger.debug(
          `server index:: removing context route from url:: ${req.url}`
        );

        req.url = req.url.replace(contextRoute, '');

        if (req.url[0] !== '/') {
          services.logger.debug(
            `server index:: prepending "/" to req.url for index route:: ${req.url}`
          );

          req.url = `/${req.url}`;
        }

        // TODO - check whether this is working or not!
        //  services.cachingService({ req, res, app, ssrCache: services.ssrCache });

        services.logger.debug('server index:: forwarding on to NextJS handler');

        return handle(req, res, parsedUrl);
      });

      server.listen(process.env.APP_PORT, () => {
        services.logger.debug(
          `server index:: listening on port ${process.env.APP_PORT}`
        );
      });
    } catch (err) {
      services.logger.error(`Error occurred handling${err}`);
    }
  })
  .catch(async (error) => {
    services.logger.error(`server index:: error:: ${error.stack}`);

    process.exit(1);
  });
