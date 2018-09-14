import React from "react";
import Text from "@casumo/cmp-text";
import Card from "@casumo/cmp-card";
import Flex from "@casumo/cmp-flex";
import { PlayerIcon } from "@casumo/cmp-icons";
import LazyImage from "./LazyImage";
import ScrollingContainer from "@casumo/cmp-scrollable";
import classNames from "classnames";

import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
import legacyBridge from "../legacyBridge";
import { decodeString } from "../lib/utils";

import GameTile from "./GameTile";
import Matcher from "./Matcher";
import CardData from "./CardData";
import GameListSkeleton from "./GameListSkeleton";
import CMSField from "./CMSField";

const renderImage = src => (
  <LazyImage
    className="c-card__img-pic"
    style={{ width: "100%" }}
    src={src}
    dpr={3}
  />
);

const renderPlayers = n => (
  <div className="o-flex-align--center">
    <PlayerIcon className="u-margin-vert t-color-grey" size="sml" />
    <span className="u-margin-left--micro u-margin-vert u-font-weight-bold t-color-grey-dark-2">
      {n}
    </span>
  </div>
);

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderCardData = game => <CardData game={game} />;

const renderCards = ({ games }) =>
  games.map(o => (
    <Flex.Item className="o-flex__item-fixed-size o-flex" key={o.slug}>
      <Card
        image={renderImage(o.lobby.image)}
        cardData={renderCardData(o.lobby)}
        heading={
          <Text tag="strong" className="t-color-grey-dark-2">
            {decodeString(o.name)}
          </Text>
        }
        footer={renderPlayers(o.lobby.players)}
        cta={{
          text: (
            <Text className="u-text-transform-capitalize u-font-weight-bold">
              <CMSField
                slug="mobile.live-casino-cards-content"
                field="play_now"
              />
            </Text>
          ),
          onClick: () => emitLaunchGame(o.slug),
        }}
        text={renderBets(o.lobby.bets)}
      />
    </Flex.Item>
  ));

const renderTiles = ({ games }) =>
  games.map(game => (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-top-game"
      key={game.slug}
    >
      <GameTile {...game} launchGame={() => emitLaunchGame(game.slug)} />
    </Flex.Item>
  ));

const renderExclusiveTiles = ({ games }) =>
  games.map(game => (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-exclusive-game"
      key={game.slug}
    >
      <GameTile
        {...game}
        ratio="game-tile-exclusive"
        imgixOpts={{
          w: 188,
          h: 280,
          fit: "crop",
        }}
        launchGame={() => emitLaunchGame(game.slug)}
      />
    </Flex.Item>
  ));

const CardsOrTiles = props => (
  <Matcher
    getKey={({ display }) => display}
    matchers={{
      cards: renderCards,
      tiles: renderTiles,
      exclusiveTiles: renderExclusiveTiles,
    }}
    {...props}
  />
);

const renderList = ({ display, games }) => (
  <ScrollingContainer
    padding={{
      default: "small",
      tablet: "xlarge",
      desktop: "xlarge",
    }}
    itemSpacing={display === "cards" ? "small" : "default"}
  >
    <CardsOrTiles display={display} games={games} />
  </ScrollingContainer>
);

const renderSkeleton = ({ display }) => (
  <GameListSkeleton
    itemWidth={display === "cards" ? 320 : 160}
    itemRatio={display === "cards" ? 0.98 : 1.2}
    itemGap={display === "cards" ? 16 : 8}
    display={display}
    title={false}
    preserveAspectRatio="xMinYMin"
    colorLow="#eff6f6"
    colorHi="#ffffff"
    className="u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
  />
);

const LoadingOrList = props => (
  <Matcher
    getKey={({ condition }) => condition}
    matchers={{
      list: renderList,
      loading: renderSkeleton,
    }}
    {...props}
  />
);

const GameList = props => {
  const { games, title, link } = props;
  const loading = games.length ? "list" : "loading";
  return (
    <div className="u-padding-top--semi">
      <div className="u-display--flex">
        <Text
          className={classNames(
            "u-padding-bottom--small",
            "u-padding-bottom--normal@tablet",
            "u-padding-bottom--normal@desktop",
            "u-padding-left--small",
            "u-padding-left--xlarge@tablet",
            "u-padding-left--xlarge@desktop",
            "u-font-weight-bold",
            link && "flex-1"
          )}
          tag="h3"
        >
          {title}
        </Text>
      </div>

      <LoadingOrList condition={loading} {...props} />
    </div>
  );
};

export default GameList;
