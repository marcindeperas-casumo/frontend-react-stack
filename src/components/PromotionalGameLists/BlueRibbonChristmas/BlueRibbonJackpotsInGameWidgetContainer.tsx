// @flow
import * as React from "react";
import { BlueRibbonJackpotsInGameWidget } from "./BlueRibbonJackpotsInGameWidget";
import type { JackpotWidgetContentPage } from "./blueRibbonConsts";
import type { BlueRibbonJackpotEntry } from "./useDataForBlueRibbonJackpotsWidget";

export function BlueRibbonJackpotsInGameWidgetContainer({
  jackpots,
  t,
  available,
}: {
  jackpots: Array<BlueRibbonJackpotEntry>,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  t: ?JackpotWidgetContentPage,
  available: boolean,
}) {
  if (!t || !available || !jackpots || jackpots.length === 0) {
    return null;
  }

  return <BlueRibbonJackpotsInGameWidget jackpots={jackpots} t={t} />;
}
