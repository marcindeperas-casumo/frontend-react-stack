import React from "react";
import { useJurisdiction } from "Utils/hooks";
import { JURISDICTIONS } from "Src/constants";
import { DGOJBar } from "./DGOJBar";
import { MGABar } from "./MGABar";
import { SGABar } from "./SGABar";
import "./PlayOkayBar.scss";

const jurisdictionBarMapping = {
  [JURISDICTIONS.DGOJ]: DGOJBar,
  [JURISDICTIONS.MGA]: MGABar,
  [JURISDICTIONS.SGA]: SGABar,
};

export const PlayOkayBar = () => {
  const { jurisdiction } = useJurisdiction();
  const PlayOkarBarComponent = jurisdictionBarMapping[jurisdiction] || MGABar;

  return <PlayOkarBarComponent />;
};
