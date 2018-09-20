import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Card from "@casumo/cmp-card";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import { PlayerIcon } from "@casumo/cmp-icons";

import info from "../../../.storybook/storybookInfo";

import CardData from "./";

const stories = storiesOf("Card", module);

const renderImage = src => <ResponsiveImage src={src} />;
const renderCardData = game => <CardData game={game} />;
const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");
const renderPlayers = n => (
  <div className="o-flex-align--center">
    <PlayerIcon className="u-margin-vert t-color-grey" size="sml" />
    <span className="u-margin-left--micro u-margin-vert u-font-weight-bold">
      {n}
    </span>
  </div>
);

stories.add(
  "Default",
  () => (
    <Card
      image={renderImage(
        "http://www.bestcasinosites.net/images/live-blackjack-casumo-casino.jpg"
      )}
      heading="Casumo Roulette"
      cta={{ text: "Play Now", onClick: action("clicked") }}
      text={renderBets({ symbol: "€", min: 0, max: 500 })}
      providerLogoSrc="https://casimg.com/casinonaut/rw-big-logo-rooms/0/59c/a0c73f41c9.svg"
      footer={renderPlayers(352)}
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "CardData MoneyWheel",
  () => (
    <Card
      image={renderImage(
        "http://www.bestcasinosites.net/images/live-blackjack-casumo-casino.jpg"
      )}
      cardData={renderCardData({
        results: ["01", "02", "05", "10", "20"],
        type: "MoneyWheel",
      })}
      heading="Casumo Roulette"
      cta={{ text: "Play Now", onClick: action("clicked") }}
      text={renderBets({ symbol: "€", min: 0, max: 500 })}
      providerLogoSrc="https://casimg.com/casinonaut/rw-big-logo-rooms/0/59c/a0c73f41c9.svg"
      footer={renderPlayers(352)}
    />
  ),
  info({ text: "CardData MoneyWheel" })
);

stories.add(
  "CardData Roulette",
  () => (
    <Card
      image={renderImage(
        "http://www.bestcasinosites.net/images/live-blackjack-casumo-casino.jpg"
      )}
      cardData={renderCardData({
        results: ["8", "30", "23", "0", "29"],
        type: "Roulette",
      })}
      heading="Casumo Roulette"
      cta={{ text: "Play Now", onClick: action("clicked") }}
      text={renderBets({ symbol: "€", min: 0, max: 500 })}
      providerLogoSrc="https://casimg.com/casinonaut/rw-big-logo-rooms/0/59c/a0c73f41c9.svg"
      footer={renderPlayers(352)}
    />
  ),
  info({ text: "CardData Roulette" })
);

stories.add(
  "CardData Blackjack",
  () => (
    <Card
      image={renderImage(
        "http://www.bestcasinosites.net/images/live-blackjack-casumo-casino.jpg"
      )}
      cardData={renderCardData({ seats: 3, type: "Blackjack" })}
      heading="Casumo Roulette"
      cta={{ text: "Play Now", onClick: action("clicked") }}
      text={renderBets({ symbol: "€", min: 0, max: 500 })}
      providerLogoSrc="https://casimg.com/casinonaut/rw-big-logo-rooms/0/59c/a0c73f41c9.svg"
      footer={renderPlayers(4)}
    />
  ),
  info({ text: "CardData Blackjack" })
);

stories.add(
  "CardData Blackjack full",
  () => (
    <Card
      image={renderImage(
        "http://www.bestcasinosites.net/images/live-blackjack-casumo-casino.jpg"
      )}
      cardData={renderCardData({ seats: 0, type: "Blackjack" })}
      heading="Casumo Roulette"
      cta={{ text: "Play Now", onClick: action("clicked") }}
      text={renderBets({ symbol: "€", min: 0, max: 500 })}
      providerLogoSrc="https://casimg.com/casinonaut/rw-big-logo-rooms/0/59c/a0c73f41c9.svg"
      footer={renderPlayers(6)}
    />
  ),
  info({ text: "CardData Blackjack full" })
);
