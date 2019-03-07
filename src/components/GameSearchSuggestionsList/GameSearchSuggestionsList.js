// @flow
import React, { PureComponent } from "react";

import SectionList from "Components/SectionList";
import GameRowSearch from "Components/GameRowSearch";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";

type Props = {
  gameSearchSuggestedList: {
    games: Array<string>,
    title: string,
  },
};

export default class GameSearchSuggestionsList extends PureComponent<Props> {
  renderListSkeleton = () => (
    <GameListSkeleton
      className="u-padding-horiz--md"
      hasTitle
      titleYOffset={20}
    />
  );

  render() {
    const { games, title } = this.props.gameSearchSuggestedList;

    return games && games.length ? (
      <SectionList
        className="u-padding-horiz--md"
        sections={[
          {
            title,
            data: games,
          },
        ]}
        renderItem={id => <GameRowSearch slug={id} />}
      />
    ) : (
      this.renderListSkeleton()
    );
  }
}
