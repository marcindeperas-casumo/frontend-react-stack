import debounce from "lodash/debounce";
import React, { PureComponent } from "react";
import SearchInput from "Components/SearchInput";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";

type OwnProps = {
  onChange: (query: string) => void;
  clearSearch: Function;
  noResults: boolean;
  placeholder: string;
  trackHandler: Function;
  colorBackgroundClass?: string;
};

type State = {
  query: string;
};

type Props = OwnProps & typeof GameSearchInput.defaultProps;

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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

    if (query) {
      this.trackSearchInitiated(query);
    }

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
      <SearchInput
        autoFocus
        value={this.state.query}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        onChange={this.handleSearchInput}
        onClear={this.handleClearSearchInput}
        placeholder={this.props.placeholder}
        onFocus={this.onFocus}
        colorBackgroundClass={this.props.colorBackgroundClass}
      />
    );
  }
}
