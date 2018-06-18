import React from "react";
import ListHeading from "./ListHeading";
import ScrollingContainer from "./ScrollingContainer";
import LazyGamePlate from "./LazyGamePlate";

const renderGamePlate = game => <LazyGamePlate key={game.slug} {...game} />;
const renderEmptyListOfGames = () => <div>EMPTY_LIST</div>;
const renderListOfGamePlates = (games = []) => games.map(renderGamePlate);

const ListContainer = ({ title, games }) => (
  <React.Fragment>
    <ListHeading title={title} />
    <ScrollingContainer>
      {games.length === 0
        ? renderEmptyListOfGames()
        : renderListOfGamePlates(games)}
    </ScrollingContainer>
  </React.Fragment>
);

export default ListContainer;
