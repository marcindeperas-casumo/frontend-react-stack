// @flow
import React, { PureComponent } from "react";

import Flex from "@casumo/cmp-flex";
import SearchInput from "Components/SearchInput";
import SectionsList from "Components/SectionsList";
import GameRowSearch from "Components/GameRowSearch";
import List from "Components/List";
import debounce from "debounce";

type Props = {
  isLoaded: boolean,
  fetchAllGames: Function,
  fetchSearch: Function,
  dispatchLaunchGame: Function,
  games: Array<string>,
  searchResults: Array<string>,
};

type State = {
  query: string,
};

export default class GameSearch extends PureComponent<Props, State> {
  state = {
    query: "",
  };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line fp/no-mutation
    this.fetchSearchResults = debounce(this.fetchSearchResults, 1000);
  }

  componentDidMount() {
    const { isLoaded, fetchAllGames } = this.props;
    if (!isLoaded) fetchAllGames();
  }

  fetchSearchResults = () => {
    const { fetchSearch } = this.props;
    const { query } = this.state;

    return fetchSearch(query);
  };

  handleSearchInput = (event: Event) => {
    if (event.currentTarget instanceof HTMLInputElement) {
      this.setState(
        {
          query: event.currentTarget.value,
        },
        e => this.fetchSearchResults()
      );
    }
  };

  handleClearSearchInput = () => {
    this.setState({ query: "" });
    this.fetchSearchResults();
  };

  handleFocusSearchInput = () => {};

  render() {
    const { games, searchResults } = this.props;

    return (
      <Flex direction="vertical" spacing="none">
        <Flex.Block>
          <Flex align="stretch">
            <Flex.Block>
              <div className="t-background-grey-light-2 u-padding--md u-position-sticky">
                <SearchInput
                  autoFocus={true}
                  value={this.state.query}
                  onChange={this.handleSearchInput}
                  onClear={this.handleClearSearchInput}
                  onFocus={this.handleFocusSearchInput}
                  placeholder="Eg. game title, provider"
                />
              </div>
              <div className="u-padding-horiz--md">
                {searchResults.length === 0 ? (
                  <SectionsList items={games} />
                ) : (
                  <List
                    items={searchResults}
                    itemSpacing="default"
                    render={id => <GameRowSearch id={id} />}
                  />
                )}
              </div>
            </Flex.Block>
          </Flex>
        </Flex.Block>
      </Flex>
    );
  }
}
