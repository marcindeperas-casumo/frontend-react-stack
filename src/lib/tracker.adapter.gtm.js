// @flow
import { GoogleTagManagerService } from "Components/GoogleTagManager";

const noop = () => {};

const gtm = GoogleTagManagerService();

const track = (event: string, data: Object) => {
  gtm.trackEvent({ event, data });
};

const trackerAdapterGTM = () => {
  gtm.init();

  return {
    track,
    setState: noop, // this can perhaps be a fn wrapping dataLayer.push()
  };
};

export default trackerAdapterGTM;
