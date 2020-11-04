// @flow

import React from "react";
import { JURISDICTIONS } from "Src/constants";
import { DGOJBar } from "./DGOJBar";
import { MGABar } from "./MGABar";
import { DGABar } from "./DGABar";
import { SGABar } from "./SGABar";
import { GGLBar } from "./GGLBar";
import "./PlayOkayBar.scss";

type Props = {
  jurisdiction: string,
};

const jurisdictionBarMapping = {
  [JURISDICTIONS.DGOJ]: DGOJBar,
  [JURISDICTIONS.MGA]: MGABar,
  [JURISDICTIONS.DGA]: DGABar,
  [JURISDICTIONS.SGA]: SGABar,
  [JURISDICTIONS.GGL]: GGLBar,
};

export const PlayOkayBar = ({ jurisdiction }: Props) => {
  const PlayOkarBarComponent = jurisdictionBarMapping[jurisdiction] || MGABar;

  return (
    <PlayOkarBarComponent className="c-playokay-bar t-background-grey-90 t-color-white u-padding-right u-position-relative" />
  );
};
