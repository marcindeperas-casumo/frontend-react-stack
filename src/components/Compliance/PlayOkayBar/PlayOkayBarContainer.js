// @flow

import React from "react";
import { useJurisdiction } from "Utils/hooks";
import { PlayOkayBar } from "./PlayOkayBar";

export const PlayOkayBarContainer = () => {
  const { jurisdiction } = useJurisdiction();

  return <PlayOkayBar jurisdiction={jurisdiction} />;
};
