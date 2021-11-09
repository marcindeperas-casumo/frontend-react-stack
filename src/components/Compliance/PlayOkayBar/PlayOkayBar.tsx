import React from "react";
import { JURISDICTIONS } from "Src/constants";
import { DGOJBar } from "./DGOJBar";
import { MGABar } from "./MGABar";
import { DGABar } from "./DGABar";
import { SGABar } from "./SGABar";
import { GGLBar } from "./GGLBar";
import { UKGCBar } from "./UKGCBar";
import { GRABar } from "./GRABar";
import "./PlayOkayBar.scss";

type Props = {
  jurisdiction: string;
  gameCategory: string;
};

const jurisdictionBarMapping = {
  [JURISDICTIONS.DGOJ]: DGOJBar,
  [JURISDICTIONS.MGA]: MGABar,
  [JURISDICTIONS.DGA]: DGABar,
  [JURISDICTIONS.SGA]: SGABar,
  [JURISDICTIONS.GGL]: GGLBar,
  [JURISDICTIONS.UKGC]: UKGCBar,
  [JURISDICTIONS.GRA]: GRABar,
};

export const PlayOkayBar = ({ jurisdiction, gameCategory }: Props) => {
  const PlayOkarBarComponent = jurisdictionBarMapping[jurisdiction] || MGABar;

  return (
    <PlayOkarBarComponent
      gameCategory={gameCategory}
      className="c-playokay-bar text-white u-padding-right o-position--relative"
    />
  );
};
