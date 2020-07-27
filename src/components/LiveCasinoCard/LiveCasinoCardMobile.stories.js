// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { LiveCasinoCardMobile } from "./LiveCasinoCardMobile";
import {
  MoneyWheel,
  Roulette,
  Blackjack,
  BlackjackFull,
  TopCard,
  Monopoly,
  Baccarat,
} from "./__mocks__";

const stories = storiesOf("LiveCasinoCardMobile", module);
const t = {
  playNowText: "Play now 👻",
  betBehindText: "Bet behind",
  openSeatsText: "Seats left",
  opensAtText: "Opens at {{time}}",
  tableClosedText: "Closed",
};

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card--small">
    <MockStore>
      <LiveCasinoCardMobile
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
      <LiveCasinoCardMobile
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
      <LiveCasinoCardMobile
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
      <LiveCasinoCardMobile
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
      <LiveCasinoCardMobile
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
      <LiveCasinoCardMobile
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
      <LiveCasinoCardMobile
        game={Baccarat}
        t={t}
        liveCasinoTable={Baccarat.liveCasinoLobby}
      />
    </MockStore>
  </div>
));
