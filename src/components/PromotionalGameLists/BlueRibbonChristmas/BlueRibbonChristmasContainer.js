// @flow
import * as React from "react";
import * as R from "ramda";
import { useFetch } from "Utils/hooks";
import { urls } from "./blueRibbonConsts";
import { BlueRibbonChristmas } from "./BlueRibbonChristmas";

export function BlueRibbonChristmasContainer() {
  const { response } = useFetch(urls.handshake);
  const available = R.propOr(false, "available", response);
  const jackpot = R.pathOr([], ["jackpots", 0], response);

  if (!available) {
    return null;
  }

  return <BlueRibbonChristmas jackpot={jackpot} />;
}
