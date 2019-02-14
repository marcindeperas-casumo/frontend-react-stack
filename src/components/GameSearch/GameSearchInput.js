// @flow
import React, { PureComponent } from "react";

import SearchInput from "Components/SearchInput";
import { debounce } from "lodash";

type Props = {
  initFetchQuerySearch: Function,
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.query !== this.state.query) {
      this.fetchSearchResults();
    }
  }

  fetchSearchResults = () => this.props.initFetchQuerySearch(this.state.query);

  handleSearchInput = (event: Event) => {
    if (event.currentTarget instanceof HTMLInputElement) {
      this.setState({
        query: event.currentTarget.value,
      });
    }
  };

  handleClearSearchInput = () => {
    this.setState({ query: "" });
    this.props.clearSearch();
  };

  handleFocusSearchInput = () => {};

  render() {
    return (
      <SearchInput
        autoFocus={true}
        value={this.state.query}
        onChange={this.handleSearchInput}
        onClear={this.handleClearSearchInput}
        hasNoResults={this.props.hasNoResults}
        onFocus={this.handleFocusSearchInput}
        placeholder="Eg. game title, provider"
      />
    );
  }
}
