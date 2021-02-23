// @flow
import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@types/react"' has ... Remove this comment to see the full error message
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
