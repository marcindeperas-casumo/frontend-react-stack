import React from "react";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";

import { decodeString } from "Utils/index";
import ImageLazy from "Components/Image/ImageLazy";
import CMSField from "Components/CMSField";
import CardFooter from "Components/LiveCasinoCard/LiveCasinoCardFooter";
import CardData from "Components/LiveCasinoCard/LiveCasinoCardData";
import { launchGame } from "Services/LaunchGameService";

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

const CasinoHeader = ({ lobby }) => (
  <div className="o-ratio o-ratio--live-casino-card t-border-r--8">
    <ImageLazy className="o-ratio__content" src={lobby.image} dpr={3} />
    <Flex
      direction="vertical"
      align="center"
      justify="end"
      className="o-ratio__content u-font-weight-bold"
      style={{
        background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
      }}
    >
      <CardData lobby={lobby} />
    </Flex>
  </div>
);

const CasinoContent = ({ name, lobby, slug, launchGame }) => (
  <Flex>
    <Flex.Block>
      <Text
        tag="h3"
        className="u-font-weight-black u-margin-bottom--sm u-text-clamp t-color-grey-dark-2"
      >
        {decodeString(name)}
      </Text>
      <Text tag="span">{renderBets(lobby.bets)}</Text>
    </Flex.Block>
    <Flex.Item>
      <Button
        onClick={launchGame}
        className="u-text-nowrap u-text-transform-capitalize"
      >
        <CMSField slug="mobile.live-casino-cards-content" field="play_now" />
      </Button>
    </Flex.Item>
  </Flex>
);

export default function LiveCasinoCard({ game }) {
  return (
    <Flex.Item className="o-flex__item-fixed-size o-flex c-live-casino-card">
      <Card
        className="u-width--1/1"
        spacing="md"
        header={() => <CasinoHeader lobby={game.lobby} />}
        content={() => (
          <CasinoContent
            name={game.name}
            lobby={game.lobby}
            slug={game.slug}
            launchGame={() => launchGame(game.slug)}
          />
        )}
        footer={() => <CardFooter {...game.lobby} />}
      />
    </Flex.Item>
  );
}
