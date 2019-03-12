// @flow
import React, { PureComponent } from "react";

import SearchInput from "Components/SearchInput";
import debounce from "lodash/debounce";
import { track } from "Services/tracker";
import { TrackContext } from "Components/TrackProvider";
import { EVENTS } from "Src/constants";

type Props = {
  initFetchQuerySearch: Function,
  clearSearch: Function,
  noResults: boolean,
  placeholder: string,
  trackHandler: Function,
};

type State = {
  query: string,
};

export default class GameSearchInput extends PureComponent<Props, State> {
  static contextType = TrackContext;
  static defaultProps = {
    trackHandler: track,
  };
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

  onFocus = () => {
    this.props.trackHandler(EVENTS.SEARCH_INTENT, { ...this.context });
  };

  fetchSearchResults = () => this.props.initFetchQuerySearch(this.state.query);

  handleSearchInput = ({ target }: { target: HTMLInputElement }) => {
    this.setState({
      query: target.value,
    });
  };

  handleClearSearchInput = () => {
    this.setState({ query: "" });
    this.props.clearSearch();
  };

  render() {
    return (
      <SearchInput
        autoFocus
        value={this.state.query}
        onChange={this.handleSearchInput}
        onClear={this.handleClearSearchInput}
        noResults={this.props.noResults}
        placeholder={this.props.placeholder}
        onFocus={this.onFocus}
      />
    );
  }
}
