// @flow
import React, { PureComponent } from "react";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import List from "@casumo/cmp-list";
import GameRow from "Components/GameRow";
import Text from "@casumo/cmp-text";
import ErrorMessage from "Features/sports/components/ErrorMessage/index";

type ProviderObject = {
  inMaintenance: boolean,
  name: string,
  games: Array<string>,
};

type Props = {
  /** the function that fetches the games */
  fetchGames: () => void,
  /**  has the game list completed loading? */
  isLoaded: boolean,
  error?: string,
  provider: ProviderObject,
};

class ProviderGamesList extends PureComponent<Props> {
  static defaultProps = {
    fetchGames: () => {},
    isLoaded: false,
    provider: {},
  };

  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    const { isLoaded, provider, error } = this.props;

    if (provider.inMaintenance) {
      return <ErrorMessage errorMessage={"Provider in maintenance"} />;
    }

    if (error) {
      return <ErrorMessage errorMessage={error} />;
    }

    if (!isLoaded) {
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
          <List items={provider.games} render={id => <GameRow id={id} />} />
        </div>
      </div>
    );
  }
}

export default ProviderGamesList;
