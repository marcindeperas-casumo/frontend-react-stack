// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { BlueRibbonJackpotsFooterWidget } from "./BlueRibbonJackpotsFooterWidget";
import { t } from "./__mocks__/t";
import { jackpots } from "./__mocks__/jackpots";

const stories = storiesOf("BlueRibbon", module);
stories.add("JackpotsFooterWidget", () => (
  <MockStore>
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ communityWinRatio: number; label: string; ... Remove this comment to see the full error message */}
    <BlueRibbonJackpotsFooterWidget jackpots={jackpots} t={t} />
  </MockStore>
));
