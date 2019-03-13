// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import GameRow from "Components/GameRow";
import ErrorMessage from "Components/ErrorMessage";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";

type ProviderObject = {
  inMaintenance: boolean,
  name: string,
  games: Array<string>,
};

type Props = {
  /** the function that fetches the games */
  fetchGames: () => void,
  /**  has the game list completed loading? */
  areGamesLoaded: boolean,
  error?: string,
  provider: ProviderObject,
};

class ProviderGamesList extends PureComponent<Props> {
  static defaultProps = {
    fetchGames: () => {},
    areGamesLoaded: false,
    provider: {},
  };

  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    const { areGamesLoaded, provider, error } = this.props;

    if (provider.inMaintenance) {
      return <ErrorMessage errorMessage={"Provider in maintenance"} />;
    }

    if (error) {
      return <ErrorMessage errorMessage={error} />;
    }

    if (!areGamesLoaded) {
      return <GameListSkeleton />;
    }

    return (
      <div>
        <Text
          align="center"
          size="md"
          className="u-padding--lg t-background-grey-light-2"
          data-test="provider-games-list-title"
        >
          {provider.name}
        </Text>
        <div className="u-padding-horiz--md u-padding-bottom--md">
          <TrackProvider
            data={{
              [EVENT_PROPS.LOCATION]: "Game Provider - Filtered Games Page",
            }}
          >
            <List items={provider.games} render={id => <GameRow id={id} />} />
          </TrackProvider>
        </div>
      </div>
    );
  }
}

export default ProviderGamesList;
