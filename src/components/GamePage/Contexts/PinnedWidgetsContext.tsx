// @flow
import * as React from "react";
import * as R from "ramda";

type PinnedWidgetsContextType = {
  pinnedWidgets: Array<string>,
  togglePin: (drawer: string) => void,
};

type PinnedWidgetsContextProviderProps = {
  children: React.Node,
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
  const [pinnedWidgets, setPinnedWidgets] = React.useState<Array<string>>([]);
  const togglePin = React.useCallback((widget: string): void => {
    setPinnedWidgets(prevValue => {
      if (prevValue.includes(widget)) {
        return R.reject(R.equals(widget), prevValue);
      }

      return [...prevValue, widget];
    });
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
