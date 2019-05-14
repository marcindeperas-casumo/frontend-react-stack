// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import SectionList from "Components/SectionList";
import { GameRowSearch } from "Components/GameRowSearch";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS } from "Src/constants";

type Props = {
  list: {
    games: Array<string>,
    title: string,
    location: string,
  },
  loading: boolean,
  className?: string,
};

export class GameSearchSuggestionsList extends PureComponent<Props> {
  renderListSkeleton = () => (
    <GameListSkeleton
      className="u-padding-horiz--md u-game-search-max-width"
      hasTitle
      titleYOffset={20}
    />
  );

  render() {
    const { games, title, location } = this.props.list;

    return games && games.length && !this.props.loading ? (
      <TrackProvider data={{ [EVENT_PROPS.LOCATION]: location }}>
        <SectionList
          className={classNames("u-padding-horiz--md", this.props.className)}
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
