import React from "react";
import Flex from "@casumo/cmp-flex";
import ScrollingContainer from "@casumo/cmp-scrollable";

import { KO_APP_EVENT_LAUNCH_GAME } from "../../constants";
import legacyBridge from "../../legacyBridge";

import GameListSkeleton from "./GameListSkeleton";
import GameListTiles from "./GameListTiles";
import GameListTitle from "./GameListTitle";
import GameListExclusiveTiles from "./GameListExclusiveTiles";
import LiveCasinoCard from "../LiveCasinoCard";
import Matcher from "../Matcher";

export const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderLiveCasinoCards = ({ games }) =>
  games.map(game => (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-live-casino-card"
      key={game.slug}
    >
      <LiveCasinoCard {...game} launchGame={() => emitLaunchGame(game.slug)} />
    </Flex.Item>
  ));

const renderTiles = ({ games }) =>
  games.map(game => <GameListTiles game={game} key={game.slug} />);

const renderExclusiveTiles = ({ games }) =>
  games.map(game => <GameListExclusiveTiles game={game} key={game.slug} />);

const CardsOrTiles = props => (
  <Matcher
    getKey={({ display }) => display}
    matchers={{
      tiles: renderTiles,
      liveCasinoCards: renderLiveCasinoCards,
      exclusiveTiles: renderExclusiveTiles,
    }}
    {...props}
  />
);

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

const renderList = ({ display, games }) => (
  <ScrollingContainer
    padding={paddingPerDevice}
    itemSpacing={display === "cards" ? "md" : "default"}
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
    preserveAspectRatio="xMinYMin"
    colorLow="#eff6f6"
    colorHi="#ffffff"
    className="u-padding-left--md u-padding-left--2xlg@tablet u-padding-left--2xlg@desktop"
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
    <div className="u-padding-top--xlg">
      <div className="u-display--flex">
        <GameListTitle title={title} link={link} />
      </div>

      <LoadingOrList condition={loading} {...props} />
    </div>
  );
};

export default GameList;
