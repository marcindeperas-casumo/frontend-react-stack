// @flow
import * as React from "react";
import * as R from "ramda";

type PinnedDrawersContextType = {
  pinnedDrawers: Array<string>,
  togglePin: (drawer: string) => void,
  isPinned: (drawer: string) => boolean,
};

export const PinnedDrawersContext = React.createContext<PinnedDrawersContextType>(
  {
    pinnedDrawers: [],
    togglePin: () => {},
    isPinned: R.F,
  }
);
