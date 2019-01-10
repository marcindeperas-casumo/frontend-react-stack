// @flow
import React from "react";
import type { Node } from "react";

// Whatever attributes the parent wants to set
// for the tracking functions inside the children
export const DEFAULT_CONTEXT = {};

export const TrackContext = React.createContext<Object>(DEFAULT_CONTEXT);

type Props = {
  children: Node,
  data: Object,
};

const TrackProvider = ({ children, data = {} }: Props) => (
  <TrackContext.Provider value={data}>{children}</TrackContext.Provider>
);

export default TrackProvider;
