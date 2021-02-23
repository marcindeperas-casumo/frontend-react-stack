// @flow

const noop = () => {};

type Logger = {
  info: (...args: Array<any>) => void,
};

const trackerAdapterLog = (logger: Logger) => ({
  // @ts-expect-error ts-migrate(1015) FIXME: Parameter cannot have question mark and initialize... Remove this comment to see the full error message
  track: (eventName: string, data?: Object = {}) =>
    logger.info(`[TRACKING] - ${eventName}`, data),
  setState: noop,
});

export default trackerAdapterLog;
