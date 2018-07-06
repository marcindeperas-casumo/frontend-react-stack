import React from "react";
import Heading from "@casumo/cmp-heading";
import ScrollingContainer from "@casumo/cmp-scrollable";
import GameTile from "./GameTile";

const renderGameTile = game => <GameTile key={game.slug} {...game} />;
const renderEmptyListOfGames = () => <div>EMPTY_LIST</div>;
const renderListOfGameTiles = (games = []) => games.map(renderGameTile);

const ListContainer = ({ title, games }) => (
  <div className="u-padding-bottom--semi@mobile">
    <Heading
      className="u-padding-top--semi u-padding-bottom--small u-padding-left--small u-padding-left--xlarge@tablet
      u-padding-bottom--normal@tablet u-padding-left--xlarge@desktop u-padding-bottom--normal@desktop"
      text={title}
      rank={3}
      size="uno"
    />
    <ScrollingContainer padded>
      {games.length === 0
        ? renderEmptyListOfGames()
        : renderListOfGameTiles(games)}
    </ScrollingContainer>
  </div>
);

export default ListContainer;
