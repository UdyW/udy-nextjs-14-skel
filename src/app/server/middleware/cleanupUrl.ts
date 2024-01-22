import { NextFunction, Request, Response } from 'express';
import type { Services } from '../services';

const removeExtraUrlSlashes = (url: string, services: Services): string => {
  services.logger.debug(`removeExtraUrlSlashes:: start:: ${url}`);

  const [urlPath, queryString] = url.split('?');

  const urlWithSlashesRemoved = urlPath.replace(/(?!^)(\/+(?!\w)|\/*?$)/g, '');

  const newUrl =
    typeof queryString !== 'undefined'
      ? `${urlWithSlashesRemoved}?${queryString}`
      : urlWithSlashesRemoved;

  services.logger.debug(`removeExtraUrlSlashes:: end:: ${newUrl}`);

  return newUrl;
};

const cleanupUrl =
  (services: Services) =>
  (req: Request, res: Response, next: NextFunction): void => {
    services.logger.debug('cleanupUrl:: calling removeExtraUrlSlashes');

    const cleanUrl = removeExtraUrlSlashes(req.url, services);

    services.logger.debug(
      `cleanupUrl:: url is clean:: ${cleanUrl === req.url}`
    );

    if (cleanUrl !== req.url) {
      services.logger.warning(
        `cleanupUrl:: url not clean 301 redirecting to:: ${cleanUrl}`
      );

      return res.redirect(301, cleanUrl);
    }

    services.logger.debug('cleanupUrl:: calling next');

    return next();
  };

export { cleanupUrl, removeExtraUrlSlashes };
