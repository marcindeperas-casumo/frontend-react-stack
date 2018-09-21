import React from "react";
import { decodeString } from "../../lib/utils";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";

import LazyImage from "../LazyImage";
import CMSField from "../CMSField";
import CardPlayers from "./CardPlayers";
import CardData from "./CardData";

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

const CasinoHeader = ({ lobby }) => (
  <div className="o-ratio o-ratio--live-casino-card t-border-r--8">
    <LazyImage className="o-ratio__content" src={lobby.image} dpr={3} />
    <Flex
      direction="vertical"
      align="center"
      justify="end"
      className="o-ratio__content u-font-weight-bold"
      style={{
        background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
      }}
    >
      <CardData {...lobby} />
    </Flex>
  </div>
);

const CasinoContent = ({ name, lobby, slug, launchGame }) => (
  <Flex>
    <Flex.Block>
      <Text tag="strong" className="u-text-clamp t-color-grey-dark-2">
        {decodeString(name)}
      </Text>
      <Text>{renderBets(lobby.bets)}</Text>
    </Flex.Block>
    <Flex.Item>
      <Button onClick={launchGame} className="u-text-nowrap">
        <Text tag="strong" className="u-text-transform-capitalize">
          <CMSField slug="mobile.live-casino-cards-content" field="play_now" />
        </Text>
      </Button>
    </Flex.Item>
  </Flex>
);

const CasinoFooter = ({ number }) => (
  <div className="t-border-top t-border--current-color t-color-grey-light-2">
    <CardPlayers number={number} />
  </div>
);

export default function LiveCasinoCard({ lobby, name, slug, launchGame }) {
  return (
    <Card
      className="u-width--1/1"
      header={() => <CasinoHeader lobby={lobby} />}
      content={() => (
        <CasinoContent
          name={name}
          lobby={lobby}
          slug={slug}
          launchGame={launchGame}
        />
      )}
      footer={() => <CasinoFooter number={lobby.players} />}
    />
  );
}
