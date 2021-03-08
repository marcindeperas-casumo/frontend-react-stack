import { storiesOf } from "@storybook/react";
import * as React from "react";
import MockStore from "Components/MockStore";
import { LiveCasinoCardSmall } from "./LiveCasinoCardSmall";
import {
  MoneyWheel,
  Roulette,
  Blackjack,
  BlackjackFull,
  TopCard,
  Monopoly,
  Baccarat,
} from "./__mocks__";

const stories = storiesOf("LiveCasinoCardSmall", module);
const t = {
  play_now: "Play now 👻",
  bet_behind: "Bet behind",
  open_seats: "Seats left",
  opens_at: "Opens at {{time}}",
  table_closed: "Closed",
};

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCardSmall
        game={MoneyWheel}
        t={t}
        liveCasinoTable={MoneyWheel.liveCasinoLobby}
      />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCardSmall
        game={Roulette}
        t={t}
        liveCasinoTable={Roulette.liveCasinoLobby}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCardSmall
        game={Blackjack}
        t={t}
        liveCasinoTable={Blackjack.liveCasinoLobby}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCardSmall
        game={BlackjackFull}
        t={t}
        liveCasinoTable={BlackjackFull.liveCasinoLobby}
      />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCardSmall
        game={TopCard}
        t={t}
        liveCasinoTable={TopCard.liveCasinoLobby}
      />
    </MockStore>
  </div>
));

stories.add("Card Monopoly", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCardSmall
        game={Monopoly}
        t={t}
        liveCasinoTable={Monopoly.liveCasinoLobby}
      />
    </MockStore>
  </div>
));

stories.add("Card Baccarat", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <LiveCasinoCardSmall
        game={Baccarat}
        t={t}
        liveCasinoTable={Baccarat.liveCasinoLobby}
      />
    </MockStore>
  </div>
));
