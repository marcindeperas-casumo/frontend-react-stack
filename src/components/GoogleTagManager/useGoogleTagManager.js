// @flow
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type Context,
  type ReactNode,
} from "react";
import { initialize, pushToGTM } from "./GoogleTagManager";
import type { GTMScriptParams, GTMEventParams } from "./GoogleTagManager.types";

type GTMHookProviderProps = { state?: any, children: ReactNode };

export type GTMHook = {
  init(params: GTMScriptParams): void,
  trackEvent(params: GTMEventParams): void,
  UseGTMHookProvider: (props: GTMHookProviderProps) => React.Elementt<*>,
  useGTMHookContext: Context<GTMScriptParams>,
};

export const initialState: GTMScriptParams = {
  dataLayer: {},
  dataLayerName: "dataLayer",
  containerId: "",
};

const useGTMHookContext = createContext<GTMScriptParams>(initialState);

export const GTMHookProvider = ({ state, children }: GTMHookProviderProps) => (
  <useGTMHookContext.Provider value={state}>
    {children}
  </useGTMHookContext.Provider>
);

export const useGoogleTagManager = (): GTMHook => {
  const [dataLayerState, setDataLayerState] = useState<GTMScriptParams>(
    initialState
  );
  const gtmContextState = useContext(useGTMHookContext);

  const init = useCallback(
    (params: GTMScriptParams) =>
      setDataLayerState(state => ({
        ...state,
        ...params,
      })),
    [setDataLayerState]
  );

  const trackEvent = useCallback(
    ({ event, payload }: GTMEventParams) => {
      const params = {
        dataLayerName: gtmContextState?.dataLayerName,
        event,
        payload,
      };

      pushToGTM(params);
    },
    [gtmContextState]
  );

  useEffect(() => {
    // Only initialize if we have container id
    if (dataLayerState.containerId !== "") {
      initialize({
        dataLayer: dataLayerState.dataLayer,
        dataLayerName: dataLayerState.dataLayerName,
        containerId: dataLayerState.containerId,
      });
    }
  }, [dataLayerState]);

  const UseGTMHookProvider = ({ children }: GTMHookProviderProps) => (
    <useGTMHookContext.Provider value={dataLayerState}>
      {children}
    </useGTMHookContext.Provider>
  );

  return {
    init,
    trackEvent,
    UseGTMHookProvider,
    useGTMHookContext,
  };
};
