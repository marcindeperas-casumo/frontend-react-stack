import React from "react";
import { decodeString } from "../../lib/utils";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";

import LazyImage from "../LazyImage";
import CMSField from "Components/CMSField";
import CardPlayers from "Components/LiveCasinoCard/CardPlayers";
import CardData from "Components/LiveCasinoCard/CardData";
import { emitLaunchGame } from "Components/GameList/GameList";

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

export default function LiveCasinoCard({ game }) {
  return (
    <Flex.Item className="o-flex__item-fixed-size o-flex">
      <Card
        image={
          <LazyImage style={{ width: "100%" }} src={game.lobby.image} dpr={3} />
        }
        cardData={<CardData {...game.lobby} />}
        heading={
          <Text tag="strong" className="t-color-grey-dark-2">
            {decodeString(game.name)}
          </Text>
        }
        footer={<CardPlayers number={game.lobby.players} />}
        cta={{
          text: (
            <Text tag="strong" className="u-text-transform-capitalize">
              <CMSField
                slug="mobile.live-casino-cards-content"
                field="play_now"
              />
            </Text>
          ),
          onClick: () => emitLaunchGame(game.slug),
        }}
        text={renderBets(game.lobby.bets)}
      />
    </Flex.Item>
  );
}
