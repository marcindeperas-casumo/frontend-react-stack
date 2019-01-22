// @flow
import React, { PureComponent } from "react";

import Flex from "@casumo/cmp-flex";
import SearchInput from "Components/SearchInput";
import SectionsList from "Components/SectionsList";
import GameRowSearch from "Components/GameRowSearch";
import List from "@casumo/cmp-list";
import { debounce } from "lodash";

type Props = {
  isLoaded: boolean,
  initFetchPlayerGames: Function,
  fetchSearch: Function,
  dispatchLaunchGame: Function,
  games: Array<string>,
  searchResults: Array<string>,
  latestPlayedGames: Array<string>,
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
    const { isLoaded, initFetchPlayerGames } = this.props;
    if (!isLoaded) initFetchPlayerGames();
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
    const { games, searchResults, latestPlayedGames } = this.props;

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
                {!searchResults.length && <SectionsList items={games} />}
                {searchResults.length && (
                  <List
                    items={searchResults}
                    itemSpacing="default"
                    render={id => <GameRowSearch id={id} />}
                  />
                )}
                {searchResults.length === 1 &&
                  latestPlayedGames.length && (
                    <>
                      <p className="u-font-weight-bold u-font-md u-padding-vert--md">
                        Continue Playing
                      </p>
                      <List
                        items={latestPlayedGames}
                        itemSpacing="default"
                        render={id => <GameRowSearch id={id} />}
                      />
                    </>
                  )}
              </div>
            </Flex.Block>
          </Flex>
        </Flex.Block>
      </Flex>
    );
  }
}
