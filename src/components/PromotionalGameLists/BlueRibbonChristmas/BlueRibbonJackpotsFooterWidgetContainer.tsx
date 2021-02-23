// @flow
import * as React from "react";
import { BlueRibbonJackpotsFooterWidget } from "./BlueRibbonJackpotsFooterWidget";
import { useDataForBlueRibbonJackpotsWidget } from "./useDataForBlueRibbonJackpotsWidget";

export function BlueRibbonJackpotsFooterWidgetContainer() {
  const { jackpots, t, available } = useDataForBlueRibbonJackpotsWidget();

  if (!t || !available || !jackpots || jackpots.length < 3) {
    return null;
  }

  return <BlueRibbonJackpotsFooterWidget jackpots={jackpots} t={t} />;
}
