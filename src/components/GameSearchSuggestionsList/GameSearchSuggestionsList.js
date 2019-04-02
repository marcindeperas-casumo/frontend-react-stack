// @flow
import React, { PureComponent } from "react";
import SectionList from "Components/SectionList";
import GameRowSearch from "Components/GameRowSearch";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS } from "Src/constants";

type Props = {
  gameSearchSuggestedList: {
    games: Array<string>,
    title: string,
    location: string,
  },
  gameSearchSuggestedLoading: boolean,
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
    const { games, title, location } = this.props.gameSearchSuggestedList;

    return games && games.length && !this.props.gameSearchSuggestedLoading ? (
      <TrackProvider data={{ [EVENT_PROPS.LOCATION]: location }}>
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
      </TrackProvider>
    ) : (
      this.renderListSkeleton()
    );
  }
}
