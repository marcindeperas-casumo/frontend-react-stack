import React, { PureComponent } from "react";
import ScrollingContainer from "@casumo/cmp-scrollable";
import GameListTitle from "Components/GameList/GameListTitle";

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

export class ScrollableList extends PureComponent {
  render() {
    const { title, games, gameComponent: Component } = this.props;
    return (
      <div className="u-padding-top--xlg">
        <div className="u-display--flex">
          <GameListTitle title={title} />
        </div>

        <ScrollingContainer padding={paddingPerDevice}>
          {games.map(gameId => (
            <Component key={gameId} id={gameId} />
          ))}
        </ScrollingContainer>
      </div>
    );
  }
}

export default ScrollableList;
