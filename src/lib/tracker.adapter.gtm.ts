import { trackEvent } from "Components/GoogleTagManager";

const noop = () => {};

const track = (event: string, data: Object) => {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ event: string; data: Object; }... Remove this comment to see the full error message
  trackEvent({ event, data });
};

const trackerAdapterGTM = () => {
  return {
    track,
    setState: noop,
  };
};

export default trackerAdapterGTM;
