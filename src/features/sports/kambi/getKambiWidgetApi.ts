import { once } from "ramda";
import { injectScript } from "Utils";
import { getKambiWidgetAPI } from "Features/sports/kambi/index";
export type KambiWidgetApi = {
  [s: string]: any;
};
// eslint-disable-next-line fp/no-let
let kambiWidgetApi: KambiWidgetApi | null = null;
const injectKambiWidgetAPI: () => void = once(() =>
  injectScript(
    "https://static.kambicdn.com/client/widget-api/kambi-widget-api.js"
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
export const kambiNavigate = async (hash: string) => {
  const wapi = await getKambiWidgetAPI();
  wapi.navigateClient(hash);
};
export default getKambiWidgetApi;
