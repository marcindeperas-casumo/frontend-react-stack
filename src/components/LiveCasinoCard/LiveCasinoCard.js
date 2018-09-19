import React from "react";
import { decodeString } from "../../lib/utils";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import CMSField from "../CMSField";
import { emitLaunchGame } from "../GameList/GameList";

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

export default function LiveCasinoCard({
  game,
  renderImage,
  renderCardData,
  renderPlayers,
}) {
  return (
    <Flex.Item className="o-flex__item-fixed-size o-flex" key={game.slug}>
      <Card
        image={renderImage(game.lobby.image)}
        cardData={renderCardData(game.lobby)}
        heading={
          <Text tag="strong" className="t-color-grey-dark-2">
            {decodeString(game.name)}
          </Text>
        }
        footer={renderPlayers(game.lobby.players)}
        cta={{
          text: (
            <Text className="u-text-transform-capitalize u-font-weight-bold">
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
