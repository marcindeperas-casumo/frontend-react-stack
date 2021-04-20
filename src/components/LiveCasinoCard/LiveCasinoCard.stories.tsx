import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import { LiveCasinoCard } from "./LiveCasinoCard";
import {
  MoneyWheel,
  Roulette,
  Blackjack,
  BlackjackFull,
  TopCard,
  Monopoly,
  Baccarat,
} from "./__mocks__";

const stories = storiesOf("LiveCasinoCard", module);
const t = {
  bet_behind: "Bet behind",
  closed: "Closed",
  go_to_lobby: "Go to lobby",
  open_seats: "Open seats",
  opens_at: "Opens at {{time}}",
  play_now: "Play",
  recent_letters: "Recent letters",
  recent_numbers: "Recent numbers",
  recent_outcomes: "Recent outcomes",
  table_full: "Table full",
  table_temporarily_unavailable: "Game in maintenance",
  table_unavailable: "Unavailable",
  provider_logos: [
    {
      provider_name: "casumo",
      logo: "https://cms.casumo.com/wp-content/uploads/2021/04/casumo.png",
    },
    {
      provider_name: "evolution",
      logo: "https://cms.casumo.com/wp-content/uploads/2021/04/evolution.png",
    },
    {
      provider_name: "Ezugi",
      logo: "https://cms.casumo.com/wp-content/uploads/2021/04/ezugi.png",
    },
    {
      logo: "https://cms.casumo.com/wp-content/uploads/2021/04/netent.png",
      provider_name: "Net Entertainment",
    },
    {
      logo: "https://cms.casumo.com/wp-content/uploads/2021/04/pragmatic.png",
      provider_name: "Pragmatic Play",
    },
    {
      provider_name: "pragmatic",
      logo: "https://cms.casumo.com/wp-content/uploads/2021/04/pragmatic.png",
    },
    {
      provider_name: "Playtech",
      logo: "https://cms.casumo.com/wp-content/uploads/2021/04/playtech.png",
    },
  ],
};

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCard game={MoneyWheel} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div className="c-live-casino-card">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCard game={Roulette} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div className="c-live-casino-card">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCard game={Blackjack} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div className="c-live-casino-card">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCard game={BlackjackFull} t={t} />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div className="c-live-casino-card">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCard game={TopCard} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Monopoly", () => (
  <div className="c-live-casino-card">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCard game={Monopoly} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Baccarat", () => (
  <div className="c-live-casino-card">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCard game={Baccarat} t={t} />
    </MockStore>
  </div>
));
