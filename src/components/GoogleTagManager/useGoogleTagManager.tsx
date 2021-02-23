// @flow
import * as React from "react";
import { initialize, pushToGTM } from "./GoogleTagManager";
import type { GTMScriptParams, GTMEventParams } from "./GoogleTagManager.types";

// @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
type GTMHookProviderProps = { state?: GTMScriptParams, children: React.Node };

export type GTMHook = {
  init(params: GTMScriptParams): void,
  trackEvent(params: GTMEventParams): void,
  // @ts-expect-error ts-migrate(2724) FIXME: 'React' has no exported member named 'Element'. Di... Remove this comment to see the full error message
  GTMHookContextProvider: (props: GTMHookProviderProps) => React.Element<*>,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  GTMHookContext: React.Context<?GTMScriptParams>,
};

export const initialState: GTMScriptParams = {
  dataLayer: {},
  containerId: "",
};

// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
const GTMHookContext = React.createContext<?GTMScriptParams>(initialState);

export const GTMHookProvider = ({ state, children }: GTMHookProviderProps) => (
  <GTMHookContext.Provider value={state}>{children}</GTMHookContext.Provider>
);

export const useGoogleTagManager = (): GTMHook => {
  const [dataLayerState, setDataLayerState] = React.useState<GTMScriptParams>(
    initialState
  );

  const init = React.useCallback(
    (params: GTMScriptParams) =>
      setDataLayerState(state => ({
        ...state,
        ...params,
      })),
    [setDataLayerState]
  );

  const trackEvent = React.useCallback(({ event, payload }: GTMEventParams) => {
    // todo: add extra payload params
    // affTrackId, btag, userId, userStatus, isTestSubjectIdReady
    const params = {
      event,
      payload,
    };

    pushToGTM(params);
  }, []);

  React.useEffect(() => {
    // Only initialize if we have container id
    if (dataLayerState.containerId !== "") {
      initialize({
        dataLayer: dataLayerState.dataLayer,
        containerId: dataLayerState.containerId,
      });
    }
  }, [dataLayerState]);

  const GTMHookContextProvider = ({ children }: GTMHookProviderProps) => (
    <GTMHookContext.Provider value={dataLayerState}>
      {children}
    </GTMHookContext.Provider>
  );

  return {
    init,
    trackEvent,
    GTMHookContextProvider,
    GTMHookContext,
  };
};
