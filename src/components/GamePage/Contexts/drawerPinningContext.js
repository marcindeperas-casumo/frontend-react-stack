// @flow
import * as React from "react";

type PinnedDrawersContextType = {
  pinnedDrawers: Array<string>,
  togglePin: (x: string) => void,
};

export const pinnedDrawersContext = React.createContext<PinnedDrawersContextType>(
  {
    pinnedDrawers: [],
    togglePin: () => {},
  }
);
