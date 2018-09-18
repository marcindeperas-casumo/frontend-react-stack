import React from "react";
import GameListImage from "./GameListImage";
import GameListPlayers from "./GameListPlayers";
import GameListCards from "./GameListCards";
import GameListTiles from "./GameListTiles";
import GameListTitle from "./GameListTitle";
import GameListExclusiveTiles from "./GameListExclusiveTiles";
import ScrollingContainer from "@casumo/cmp-scrollable";
import { KO_APP_EVENT_LAUNCH_GAME } from "../../constants";
import legacyBridge from "../../legacyBridge";
import Matcher from "../Matcher";
import CardData from "../CardData";
import GameListSkeleton from "./GameListSkeleton";

const renderImage = src => <GameListImage src={src} />;

const renderPlayers = number => <GameListPlayers number={number} />;

export const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderCardData = game => <CardData game={game} />;

const renderCards = ({ games }) =>
  games.map(game => (
    <GameListCards
      game={game}
      key={game.slug}
      renderImage={renderImage}
      renderCardData={renderCardData}
      renderPlayers={renderPlayers}
    />
  ));

const renderTiles = ({ games }) =>
  games.map(game => <GameListTiles game={game} key={game.slug} />);

const renderExclusiveTiles = ({ games }) =>
  games.map(game => <GameListExclusiveTiles game={game} key={game.slug} />);

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
        <GameListTitle title={title} link={link} />
      </div>

      <LoadingOrList condition={loading} {...props} />
    </div>
  );
};

export default GameList;
