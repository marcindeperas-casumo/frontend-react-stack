// @flow
import { initialize, pushToGTM } from "./GoogleTagManager";
import { getProdConfig } from "./GoogleTagManager.constants";
import type { GTMEventParams, TSharedEventConfig, } from "./GoogleTagManager.types";
// eslint-disable-next-line fp/no-let
let sharedEventConfig: TSharedEventConfig;
// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
export const init = (eventConfig: TSharedEventConfig, dataLayer?: Object): Promise<*> => {
    // Already Initialized
    if ((window as any).dataLayer) {
        return Promise.resolve();
    }
    // eslint-disable-next-line fp/no-mutation
    sharedEventConfig = eventConfig;
    const gtmConfig = dataLayer ? getProdConfig(dataLayer) : getProdConfig();
    return initialize(gtmConfig);
};
export const trackEvent = ({ event, payload = {} }: GTMEventParams) => {
    const params = {
        event,
        payload: {
            ...sharedEventConfig,
            ...payload,
        },
    };
    pushToGTM(params);
};
