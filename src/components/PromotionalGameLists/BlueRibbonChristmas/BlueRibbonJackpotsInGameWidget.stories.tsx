import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import { BlueRibbonJackpotsInGameWidget } from "./BlueRibbonJackpotsInGameWidget";
import { t } from "./__mocks__/t";
import { jackpots } from "./__mocks__/jackpots";

const stories = storiesOf("BlueRibbon", module);
stories.add("JackpotsInGameWidget", () => (
  <MockStore>
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ communityWinRatio: number; label: string; ... Remove this comment to see the full error message */}
    <BlueRibbonJackpotsInGameWidget jackpots={jackpots} t={t} />
  </MockStore>
));
