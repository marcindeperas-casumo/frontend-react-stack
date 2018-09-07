import React from "react";
import Text from "@casumo/cmp-text";
import ScrollingContainer from "@casumo/cmp-scrollable";
import GameTile from "./GameTile";
import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
import legacyBridge from "../legacyBridge";

const renderGameTile = game => (
  <GameTile
    key={game.slug}
    {...game}
    launchGame={() => {
      const { slug } = game;

      legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
        slug,
        playForFun: false,
      });
    }}
  />
);

const renderEmptyListOfGames = () => <div>EMPTY_LIST</div>;
const renderListOfGameTiles = (games = []) => games.map(renderGameTile);

const GamesList = ({ title, games }) => (
  <div className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop">
    <Text
      className="u-font-weight-bold u-text-transform-capitalize u-padding-bottom--small u-padding-left--small u-padding-bottom--normal@tablet
      u-padding-bottom--normal@desktop u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      tag="h3"
    >
      {title}
    </Text>
    <ScrollingContainer padded>
      {games.length === 0
        ? renderEmptyListOfGames()
        : renderListOfGameTiles(games)}
    </ScrollingContainer>
  </div>
);

export default GamesList;
