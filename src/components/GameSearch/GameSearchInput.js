// @flow
import React, { PureComponent } from "react";
import debounce from "lodash/debounce";
import SearchInput from "Components/SearchInput";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";

type Props = {
  initFetchQuerySearch: Function,
  clearSearch: Function,
  noResults: boolean,
  placeholder: string,
  trackHandler: Function,
  className?: string,
};

type State = {
  query: string,
};

export default class GameSearchInput extends PureComponent<Props, State> {
  static defaultProps = {
    trackHandler: tracker.track,
  };
  state = {
    query: "",
  };

  constructor(props: Props) {
    super(props);
    this.fetchSearchResults = debounce(this.fetchSearchResults, 250);
    this.trackSearchInitiated = debounce(this.trackSearchInitiated, 1000);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.query !== this.state.query) {
      this.fetchSearchResults();
    }
  }

  onFocus = () => {
    this.props.trackHandler(EVENTS.SEARCH_INTENT);
  };

  trackSearchInitiated = (query: string) => {
    this.props.trackHandler(EVENTS.SEARCH_INITIATED, {
      query,
    });
  };

  fetchSearchResults = () => this.props.initFetchQuerySearch(this.state.query);

  handleSearchInput = ({ target }: { target: HTMLInputElement }) => {
    const query = target.value;

    query && this.trackSearchInitiated(query);

    this.setState({
      query,
    });
  };

  handleClearSearchInput = () => {
    this.setState({ query: "" });
    this.props.clearSearch();
  };

  render() {
    return (
      <div className={this.props.className}>
        <SearchInput
          autoFocus
          value={this.state.query}
          onChange={this.handleSearchInput}
          onClear={this.handleClearSearchInput}
          noResults={this.props.noResults}
          placeholder={this.props.placeholder}
          onFocus={this.onFocus}
        />
      </div>
    );
  }
}
