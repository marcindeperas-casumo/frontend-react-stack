import React from "react";
import { TGameType } from "Models/playOkay";
import Slots from "./icons/Slots.svg";
import LiveCasino from "./icons/LiveCasino.svg";
import Bingo from "./icons/Bingo.svg";
import Sports from "./icons/Sports.svg";

export const cmsSlug = "shared.playokay.game-type-exclusions";

export const availableGameTypes: Array<{
  type: TGameType;
  Icon: React.FunctionComponent;
}> = [
  {
    type: "SLOTS",
    Icon: Slots,
  },
  {
    type: "CASINO",
    Icon: LiveCasino,
  },
  {
    type: "SPORTS",
    Icon: Sports,
  },
  {
    type: "BINGO",
    Icon: Bingo,
  },
];
