// @flow
import * as React from "react";

type PinnedDrawersContextType = {
  pinnedDrawers: Array<string>,
  togglePin: (drawer: string) => void,
};

export const PinnedDrawersContext = React.createContext<PinnedDrawersContextType>(
  {
    pinnedDrawers: [],
    togglePin: () => {},
  }
);
