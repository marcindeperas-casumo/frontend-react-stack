import { once } from "ramda";
import { injectScript } from "Utils";
export type KambiWidgetApi = {
  [s: string]: any;
};
// eslint-disable-next-line fp/no-let
let kambiWidgetApi: KambiWidgetApi | null = null;
const injectKambiWidgetAPI: () => void = once(() =>
  injectScript(
    "https://c3-static.kambi.com/client/widget-api/1.0.0.100/kambi-widget-api.js"
  )
);
const apiPromise = new Promise(resolve => {
  if (kambiWidgetApi) {
    resolve(kambiWidgetApi);
  } else {
    /* eslint-disable fp/no-mutation */
    (window as any).KambiWidget = {
      apiReady: (widgetApi: KambiWidgetApi) => {
        kambiWidgetApi = widgetApi;
        resolve(widgetApi);
      },
    };
    /* eslint-enable fp/no-mutation */
  }
});
const getKambiWidgetApi = (): Promise<KambiWidgetApi> => {
  injectKambiWidgetAPI();
  return apiPromise;
};
export default getKambiWidgetApi;
