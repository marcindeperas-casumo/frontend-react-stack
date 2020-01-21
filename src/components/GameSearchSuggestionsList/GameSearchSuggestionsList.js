// @flow
import React, { PureComponent } from "react";
import SectionList from "Components/SectionList";
import { GameRow } from "Components/GameRow/GameRow";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS } from "Src/constants";
import * as A from "Types/apollo";

type Props = {
  list: {
    games: Array<A.GameSearchSuggestionsList_Game>,
    title: string,
    location: string,
  },
  loading: boolean,
};

export class GameSearchSuggestionsList extends PureComponent<Props> {
  renderListSkeleton = () => (
    <GameListSkeleton
      className="u-padding-x--md u-game-search-max-width"
      hasTitle
      titleYOffset={20}
    />
  );

  render() {
    const { games, title, location } = this.props.list;

    return games && games.length && !this.props.loading ? (
      <TrackProvider data={{ [EVENT_PROPS.LOCATION]: location }}>
        <SectionList
          className="u-padding-x--md u-game-search-max-width"
          sections={[
            {
              title,
              data: games,
            },
          ]}
          renderItem={game => <GameRow game={game} search />}
        />
      </TrackProvider>
    ) : (
      this.renderListSkeleton()
    );
  }
}
