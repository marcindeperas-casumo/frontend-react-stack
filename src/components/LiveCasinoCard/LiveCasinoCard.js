// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { compose, prop } from "ramda";
import { convertHTMLToString, renderBets } from "Utils";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import ImageLazy from "Components/Image/ImageLazy";
import { CMSField } from "Components/CMSField";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
import CardFooter from "Components/LiveCasinoCard/LiveCasinoCardFooter";
import CardData from "Components/LiveCasinoCard/LiveCasinoCardData";
import type { Game } from "Types/game";

export type Props = {
  game: Game,
  isInMyList: boolean,
  launchGame: Function,
  onFavouriteGame: Function,
  subscribeToUpdates: string => void,
  unsubscribeFromUpdates: string => void,
};

export const getTableId = compose(
  prop("tableId"),
  prop("lobby")
);

export default class LiveCasinoCard extends PureComponent<Props> {
  static defaultProps = {
    isInMyList: false,
  };

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
    const getLobby = prop("lobby");

    return getLobby(this.props.game);
  }

  renderHeader = () => {
    const { lobby } = this;

    return (
      <div
        className="o-ratio o-ratio--live-casino-card"
        onClick={this.props.launchGame}
      >
        <ImageLazy className="o-ratio__content" src={lobby.image} />
        <Flex
          direction="vertical"
          align="end"
          justify="space-between"
          className="o-ratio__content u-font-weight-bold"
          style={{
            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="t-color-white" onClick={e => e.stopPropagation()}>
            <TrackClick
              eventName={EVENTS.MIXPANEL_GAME_FAVOURITE_CLICKED}
              data={{
                [EVENT_PROPS.GAME_NAME]: this.props.game.name,
                [EVENT_PROPS.IS_FAVOURITE]: !this.props.isInMyList,
              }}
            >
              <GameTileHeart
                className="u-width--4xlg u-height--4xlg u-padding--md"
                onClick={this.props.onFavouriteGame}
                isActive={this.props.isInMyList}
              />
            </TrackClick>
          </div>
          <CardData lobby={lobby} />
        </Flex>
      </div>
    );
  };

  renderContent = () => {
    const { game, launchGame } = this.props;

    return (
      <Flex onClick={launchGame} className="u-padding-x--md">
        <Flex.Block>
          <Text
            tag="h3"
            className="u-font-weight-black u-margin-bottom--sm u-text-clamp t-color-grey-dark-2"
          >
            {convertHTMLToString(game.name)}
          </Text>
          <Text tag="span">{renderBets(game.lobby.bets)}</Text>
        </Flex.Block>
        <Flex.Item>
          <TrackClick
            eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: game.name }}
          >
            <Button
              variant="primary"
              className="u-text-nowrap u-text-transform-capitalize"
            >
              <CMSField
                slug="mobile.live-casino-cards-content"
                field="play_now"
              />
            </Button>
          </TrackClick>
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
      <Card
        className="u-width--full u-height--full t-background-white t-border-r--md t-box-shadow u-overflow-hidden"
        spacing="md"
        header={this.renderHeader}
        content={this.renderContent}
        footer={this.renderFooter}
      />
    );
  }
}
