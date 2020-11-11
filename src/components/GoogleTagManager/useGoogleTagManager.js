// @flow
import React, {
  Context,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialize, pushToGTM } from "./GoogleTagManager";
import { TSnippetParams } from "./GoogleTagManager.types";

type GTMHookProviderProps = { state?: any, children: ReactNode };

export type GTMHook = {
  init(params: TSnippetParams): void,
  trackEvent(name: string, payload: Object): void,
  UseGTMHookProvider: (props: GTMHookProviderProps) => JSX.Element,
  useGTMHookContext: Context<TSnippetParams | undefined>,
};

export const initialState: TSnippetParams = {
  dataLayer: undefined,
  dataLayerName: "dataLayer",
  containerId: "",
};

const useGTMHookContext = createContext<TSnippetParams | undefined>(
  initialState
);

export default function useGoogleTagManager(): GTMHook {
  const [dataLayerState, setDataLayerState] = useState<TSnippetParams>(
    initialState
  );
  const gtmContextState = useContext(useGTMHookContext);

  const init = useCallback(
    (snippetParams: TSnippetParams) =>
      setDataLayerState(state => ({
        ...state,
        ...snippetParams,
      })),
    [setDataLayerState]
  );

  const trackEvent = useCallback(
    (name: string, payload: Object) => {
      const params = {
        dataLayerName: gtmContextState?.dataLayerName,
        event: name,
        payload,
      };

      pushToGTM(params);
    },
    [gtmContextState]
  );

  useEffect(() => {
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
}
