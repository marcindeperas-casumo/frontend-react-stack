// @flow
import React, { PureComponent } from "react";

import Flex from "@casumo/cmp-flex";
import SearchInput from "Components/SearchInput";
import GameSearchSkeleton from "Components/GameSearch";

type Props = {
  isLoaded: boolean,
};

type State = {
  query: string,
  hideSearchResults: boolean,
};

export default class GameSearch extends PureComponent<Props, State> {
  state = {
    query: "",
    hideSearchResults: false,
  };

  handleSearchInput = (event: Event) => {
    if (event.currentTarget instanceof HTMLInputElement) {
      this.setState({
        query: event.currentTarget.value,
        hideSearchResults: false,
      });
    }
  };

  handleClearSearchInput = () => {
    this.setState({
      query: "",
      hideSearchResults: false,
    });
  };

  render() {
    const { isLoaded } = this.props;

    return !isLoaded ? (
      <GameSearchSkeleton />
    ) : (
      <Flex direction="vertical" spacing="none">
        <Flex.Block className="t-background-grey-light-2">
          <Flex className="u-padding--md" align="stretch">
            <Flex.Block>
              <SearchInput
                autoFocus={true}
                value={this.state.query}
                onChange={this.handleSearchInput}
                onClear={this.handleClearSearchInput}
                placeholder="Eg. game title, provider"
              />
            </Flex.Block>
          </Flex>
        </Flex.Block>
      </Flex>
    );
  }
}
