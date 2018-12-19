// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";

import { decodeString } from "Utils/index";
import ImageLazy from "Components/Image/ImageLazy";
import CMSField from "Components/CMSField";
import CardFooter from "Components/LiveCasinoCard/LiveCasinoCardFooter";
import CardData from "Components/LiveCasinoCard/LiveCasinoCardData";
import type { Game } from "Types/game";
import { renderBets } from "Utils/utils";
import { compose, defaultTo, prop } from "ramda";

export type Props = {
  game: Game,
  launchGame: Function,
  subscribeToUpdates: string => void,
  unsubscribeFromUpdates: string => void,
};

export const getTableId = compose(
  prop("tableId"),
  prop("lobby")
);

export default class LiveCasinoCard extends PureComponent<Props> {
  componentDidMount() {
    const { game, subscribeToUpdates } = this.props;
    const tableId = getTableId(game);
    tableId && subscribeToUpdates(tableId);
  }

  componentWillUnmount() {
    const { game, unsubscribeFromUpdates } = this.props;
    const tableId = getTableId(game);
    tableId && unsubscribeFromUpdates(tableId);
  }

  get lobby() {
    const getLobby = compose(
      defaultTo({}),
      prop("lobby")
    );

    return getLobby(this.props.game);
  }

  renderHeader = () => {
    const { lobby } = this;

    return (
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
  };

  renderContent = () => {
    const { game, launchGame } = this.props;

    return (
      <Flex>
        <Flex.Block>
          <Text
            tag="h3"
            className="u-font-weight-black u-margin-bottom--sm u-text-clamp t-color-grey-dark-2"
          >
            {decodeString(game.name)}
          </Text>
          <Text tag="span">{renderBets(game.lobby.bets)}</Text>
        </Flex.Block>
        <Flex.Item>
          <Button
            onClick={launchGame}
            className="u-text-nowrap u-text-transform-capitalize"
          >
            <CMSField
              slug="mobile.live-casino-cards-content"
              field="play_now"
            />
          </Button>
        </Flex.Item>
      </Flex>
    );
  };

  renderFooter = () => {
    const { lobby } = this;

    return <CardFooter players={lobby.players} provider={lobby.provider} />;
  };

  render() {
    const { lobby } = this;

    if (!lobby) {
      return null;
    }

    return (
      <Flex.Item className="o-flex__item-fixed-size o-flex c-live-casino-card">
        <Card
          className="u-width--1/1"
          spacing="md"
          header={this.renderHeader}
          content={this.renderContent}
          footer={this.renderFooter}
        />
      </Flex.Item>
    );
  }
}
