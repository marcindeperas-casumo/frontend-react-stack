// @flow
import * as React from "react";

export const usePin = () => {
  const [pinnedDrawers, setPinnedDrawer] = React.useState([]);
  const togglePin = React.useCallback((drawer: string): void => {
    setPinnedDrawer(prevValue => (prevValue.includes(drawer) ? [] : [drawer]));
  }, []);

  return {
    pinnedDrawers,
    togglePin,
  };
};
