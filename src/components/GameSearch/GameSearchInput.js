// @flow
import React, { PureComponent } from "react";

import SearchInput from "Components/SearchInput";
import { debounce } from "lodash";

type Props = {
  fetchSearch: Function,
  clearSearch: Function,
  hasNoResults: boolean,
};

type State = {
  query: string,
};

export default class GameSearchInput extends PureComponent<Props, State> {
  state = {
    query: "",
  };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line fp/no-mutation
    this.fetchSearchResults = debounce(this.fetchSearchResults, 500);
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
    const { clearSearch } = this.props;

    this.setState({ query: "" });
    clearSearch();
  };

  handleFocusSearchInput = () => {};

  render() {
    const { hasNoResults } = this.props;

    return (
      <SearchInput
        autoFocus={true}
        value={this.state.query}
        onChange={this.handleSearchInput}
        onClear={this.handleClearSearchInput}
        hasNoResults={hasNoResults}
        onFocus={this.handleFocusSearchInput}
        placeholder="Eg. game title, provider"
      />
    );
  }
}
