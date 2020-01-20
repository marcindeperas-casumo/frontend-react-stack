// @flow
import React, { PureComponent } from "react";
import debounce from "lodash/debounce";
import * as R from "ramda";
import SearchInput from "Components/SearchInput";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";

type Props = {
  onChange: (query: string) => {},
  clearSearch: Function,
  noResults: boolean,
  placeholder: string,
  trackHandler: Function,
  className?: string,
};

type State = {
  query: string,
};

export class GameSearchInput extends PureComponent<Props, State> {
  static defaultProps = {
    trackHandler: tracker.track,
  };
  state = {
    query: "",
  };

  constructor(props: Props) {
    super(props);
    this.onChange = debounce(this.onChange, 250);
    this.trackSearchInitiated = debounce(this.trackSearchInitiated, 1000);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.query !== this.state.query) {
      this.onChange();
    }
  }

  onFocus = () => {
    this.props.trackHandler(EVENTS.MIXPANEL_SEARCH_INTENT);
  };

  trackSearchInitiated = (query: string) => {
    this.props.trackHandler(EVENTS.MIXPANEL_SEARCH_INITIATED, {
      query,
    });
  };

  onChange = () => this.props.onChange(this.state.query);

  handleSearchInput = ({ target }: { target: HTMLInputElement }) => {
    const query = target.value.replace(/^\s+/g, "");

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
          placeholder={this.props.placeholder}
          onFocus={this.onFocus}
        />
      </div>
    );
  }
}
