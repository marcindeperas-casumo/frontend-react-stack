// @flow

const noop = () => {};

type Logger = {
  info: any => void,
};

const createAdapter = (logger: Logger) => ({
  track: (eventName, data) => logger.info(`[TRACKING] - ${eventName}`, data),
  setState: noop,
});

export default createAdapter;
