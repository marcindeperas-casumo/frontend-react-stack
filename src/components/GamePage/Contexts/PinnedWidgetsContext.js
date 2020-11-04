// @flow
import * as React from "react";

type PinnedWidgetsContextType = {
  pinnedWidgets: Array<string>,
  togglePin: (drawer: string) => void,
};

type PinnedWidgetsContextProviderProps = {
  children?: React.Node,
};

export const PinnedWidgetsContext = React.createContext<PinnedWidgetsContextType>(
  {
    pinnedWidgets: [],
    togglePin: () => {},
  }
);

export const PinnedWidgetsContextProvider = ({
  children,
}: PinnedWidgetsContextProviderProps) => {
  const [pinnedWidgets, setPinnedWidgets] = React.useState([]);
  const togglePin = React.useCallback((widget: string): void => {
    setPinnedWidgets(prevValue => (prevValue.includes(widget) ? [] : [widget]));
  }, []);

  return (
    <PinnedWidgetsContext.Provider value={{ pinnedWidgets, togglePin }}>
      {children}
    </PinnedWidgetsContext.Provider>
  );
};

export const usePinnedWidgetsContext = () => {
  return React.useContext(PinnedWidgetsContext);
};
