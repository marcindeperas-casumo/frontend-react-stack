import React from "react";
import { decodeString } from "../../lib/utils";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";

import LazyImage from "Components/LazyImage";
import CMSField from "Components/CMSField";
import CardPlayers from "Components/LiveCasinoCard/CardPlayers";
import CardData from "Components/LiveCasinoCard/CardData";

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

export default function LiveCasinoCard({ lobby, name, slug, launchGame }) {
  return (
    <Flex.Item className="o-flex__item-fixed-size o-flex" key={slug}>
      <Card
        image={
          <LazyImage style={{ width: "100%" }} src={lobby.image} dpr={3} />
        }
        cardData={<CardData {...lobby} />}
        heading={
          <Text tag="strong" className="t-color-grey-dark-2">
            {decodeString(name)}
          </Text>
        }
        footer={<CardFooter {...lobby} />}
        cta={{
          text: (
            <Text tag="strong" className="u-text-transform-capitalize">
              <CMSField
                slug="mobile.live-casino-cards-content"
                field="play_now"
              />
            </Text>
          ),
          onClick: () => launchGame(slug),
        }}
        text={renderBets(lobby.bets)}
      />
    </Flex.Item>
  );
}
