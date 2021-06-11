import { MockedProvider } from "@apollo/client/testing";
import { storiesOf } from "@storybook/react";
import React from "react";
import { SportsJackpots } from "./SportsJackpots";
import { tranlsations, composedJackpot, localEn, currency } from "./__mocks__/sportsJackpotsMock";

const stories = storiesOf("Sports/Jackpots", module);

stories.add("Default View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpot}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));

stories.add("Match Pot Dropped View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpot}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));

stories.add("Mega Pot Dropped View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpot}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));

stories.add("Match and Match Pot Dropped View", () => (
  <MockedProvider>
    <SportsJackpots
      composedJackpot={composedJackpot}
      currency={currency}
      locale={localEn}
      t={tranlsations}
    />
  </MockedProvider>
));


