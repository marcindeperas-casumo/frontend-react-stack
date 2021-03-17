import * as React from "react";
import { initialize, pushToGTM } from "./GoogleTagManager";
import type { GTMScriptParams, GTMEventParams } from "./GoogleTagManager.types";

type GTMHookProviderProps = {
  state?: GTMScriptParams;
  children: React.ReactNode;
};

export type GTMHook = {
  init(params: GTMScriptParams): void;
  trackEvent(params: GTMEventParams): void;
  GTMHookContextProvider: (props: GTMHookProviderProps) => React.ReactChild;
  GTMHookContext: React.Context<GTMScriptParams | undefined>;
};

export const initialState: GTMScriptParams = {
  dataLayer: {},
  containerId: "",
};

const GTMHookContext = React.createContext<GTMScriptParams | undefined>(
  initialState
);

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
