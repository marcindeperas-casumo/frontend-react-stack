// @flow
import * as React from "react";

type PinnedDrawersContextType = {
  pinnedDrawers: Array<string>,
  togglePin: (x: string) => void,
};

export const usePin = () => {
  const [pinnedDrawers, setPinnedDrawer] = React.useState([]);
  const togglePin = React.useCallback(
    (drawer: string): void => {
      setPinnedDrawer(pinnedDrawers.includes(drawer) ? [] : [drawer]);
    },
    [pinnedDrawers]
  );

  return {
    pinnedDrawers,
    togglePin,
  };
};

export const pinnedDrawersContext = React.createContext<PinnedDrawersContextType>(
  {
    pinnedDrawers: [],
    togglePin: () => {},
  }
);
