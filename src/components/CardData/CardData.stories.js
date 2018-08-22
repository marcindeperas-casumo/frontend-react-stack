/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { action } from "@storybook/addon-actions";

import Card from "@casumo/cmp-card";
import ResponsiveImage from "@casumo/cmp-responsive-image";

import CardDataResults from "./Results";

const stories = storiesOf("Card", module);

const renderImage = src => <ResponsiveImage src={src} />;
const renderCardData = results => <CardDataResults results={results} />;

stories.add(
  "Default",
  withInfo("Card")(() => (
    <Card
      image={renderImage(
        "http://www.bestcasinosites.net/images/live-blackjack-casumo-casino.jpg"
      )}
      cardData={renderCardData(["00", "21", "16", "01", "24"])}
      title="Casumo Roulette"
      cta={{ text: "Play Now", onClick: action("clicked") }}
      jackpot="€1,234,567.89"
      betLimits={{ symbol: "€", min: 0, max: 500 }}
      players={2}
      providerLogoSrc="https://casimg.com/casinonaut/rw-big-logo-rooms/0/59c/a0c73f41c9.svg"
    />
  ))
);

stories.add(
  "No CTA",
  withInfo("Card")(() => (
    <Card
      image={renderImage(
        "http://www.bestcasinosites.net/images/live-blackjack-casumo-casino.jpg"
      )}
      title="Vivamus et posuere ex pellentesque tempor arcu at condimentum."
      jackpot="€1,234,567.89"
      betLimits={{ symbol: "€", min: 0, max: 500 }}
      players={2}
      providerLogoSrc="https://casimg.com/casinonaut/rw-big-logo-rooms/0/59c/a0c73f41c9.svg"
    />
  ))
);
