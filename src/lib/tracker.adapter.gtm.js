// @flow
import { trackEvent } from "Components/GoogleTagManager";

const noop = () => {};

const track = (event: string, data: Object) => {
  trackEvent({ event, data });
};

const trackerAdapterGTM = () => {
  return {
    track,
    setState: noop,
  };
};

export default trackerAdapterGTM;
