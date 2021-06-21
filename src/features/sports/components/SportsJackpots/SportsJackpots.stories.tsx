import { MockedProvider } from "@apollo/client/testing";
import { storiesOf } from "@storybook/react";
import React from "react";
import { SportsJackpots } from "./SportsJackpots";
import {
  tranlsations,
  composedJackpotFull,
  composedJackpotMatchLastDayWin,
  composedJackpotMegaLastDayWin,
  composedJackpotAllLastDayWin,
  localEn,
  currency,
} from "./__mocks__/sportsJackpotsMock";

const stories = storiesOf("Sports/Jackpots", module);

stories.add("Default View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpotFull}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));

stories.add("Match Pot Dropped View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpotMatchLastDayWin}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));

stories.add("Mega Pot Dropped View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpotMegaLastDayWin}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));

stories.add("Match and Mega Pot Dropped View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpotAllLastDayWin}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));
