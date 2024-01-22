import log, { LogLevelDesc, LogLevelNames } from 'loglevel';

const logger = (() => {
  const loglevel: LogLevelDesc = process.env.LOG_LEVEL as LogLevelNames;

  log.setLevel('debug');

  return {
    warning(message: string) {
      log.warn(message);
    },

    info(message: string) {
      log.info(message);
    },

    error(message: string) {
      log.error(message);
    },

    log(message: string) {
      log.log(message);
    },

    debug(message: string) {
      log.debug(message);
    },
  };
})();

export { logger };
