// @flow

const noop = () => {};

type Logger = {
  info: (...args: Array<any>) => void,
};

const trackerAdapterLog = (logger: Logger) => ({
  track: (eventName: string, data?: Object = {}) =>
    logger.info(`[TRACKING] - ${eventName}`, data),
  setState: noop,
});

export default trackerAdapterLog;
