import React from "react";
import Heading from "@casumo/cmp-heading";
import ScrollingContainer from "@casumo/cmp-scrollable";
import GameTile from "./GameTile";
import Card from "./Card";

// the ids to display games as Cards
const gameCardsIds = ["liveCasinoGames"];

const renderGameTile = game => (
  <GameTile
    className="c-scrollable-game t-border-r--8"
    key={game.slug}
    {...game}
  />
);

const renderGameCard = game => (
  <Card className="u-margin-right" key={game.slug} {...game} />
);

const renderEmptyList = () => <div>EMPTY_LIST</div>;
const renderList = ({ id, games = [] }) =>
  games.map(gameCardsIds.includes(id) ? renderGameCard : renderGameTile);

const ListContainer = ({ id, title, games }) => (
  <div className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop">
    <Heading
      className="u-padding-bottom--small u-padding-bottom--normal@tablet u-padding-bottom--normal@desktop
      u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      text={title}
      rank={3}
      size="uno"
    />
    <ScrollingContainer padded>
      {games.length === 0 ? renderEmptyList() : renderList({ id, games })}
    </ScrollingContainer>
  </div>
);

export default ListContainer;
