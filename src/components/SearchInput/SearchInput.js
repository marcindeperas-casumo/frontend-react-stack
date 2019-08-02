// @flow
import * as React from "react";
import classNames from "classnames";
import { pick } from "ramda";
import Flex from "@casumo/cmp-flex";
import { CrossIcon, SearchIcon } from "@casumo/cmp-icons";

import "./SearchInput.scss";

// relevant props from input field we wish to expose
type InputProps = {
  value: string,
  autofocus?: boolean,
  name?: string,
  placeholder?: string,
  onChange: () => void,
  onFocus: () => void,
  onBlur?: () => void,
};

type SearchInputProps = {
  onBlur: () => void,
  onClear: () => void,
  children?: empty,
  noResults?: boolean,
};

type Props = InputProps & SearchInputProps;

type State = {
  hasFocus: boolean,
};

const noop = () => {};

class SearchInput extends React.Component<Props, State> {
  static defaultProps = {
    onBlur: noop,
    onFocus: noop,
  };

  state = { hasFocus: false };
  textInput: { current: ?HTMLInputElement } = React.createRef();

  get inputProps() {
    return pick(
      ["autofocus", "name", "onChange", "placeholder", "value"],
      this.props
    );
  }

  get input() {
    return this.textInput.current || { focus: noop, blur: noop };
  }

  handleClear = () => {
    this.input.focus();
    this.props.onClear();
  };

  // captures when a user touches an invisible div and
  // blurs the input to hide the mobile keyboard
  handleScroll = () => {
    this.setState({ hasFocus: false });
    this.input.blur();
  };

  onFocus = () => {
    this.props.onFocus();
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.props.onBlur();
    this.setState({ hasFocus: false });
  };

  render() {
    const { value, noResults } = this.props;
    const { hasFocus } = this.state;

    const hasSearchTerm = Boolean(value);

    const inputClassName = classNames(
      "c-search-input o-flex--1 u-padding-left",
      hasFocus ? "t-color-grey-dark-3" : "t-color-grey",
      hasSearchTerm ? "u-font-weight-bold u-font" : "u-font-weight-normal"
    );

    const clearButtonClassName = classNames(
      "c-search-input__clear-button t-color-white t-border-r--circle u-overflow-hidden",
      noResults ? "t-background-black" : "t-background-grey"
    );

    return (
      <Flex
        align="center"
        className="t-background-white t-border-r--pill u-overflow-hidden"
      >
        <Flex.Block>
          <label className="u-width--1/1 o-flex u-padding-left--md  u-padding-y">
            <SearchIcon
              className={hasFocus ? "t-color-grey-dark-1" : "t-color-grey"}
            />
            <input
              ref={this.textInput}
              className={inputClassName}
              type="text"
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              {...this.inputProps}
            />
          </label>
        </Flex.Block>
        {hasSearchTerm && (
          <div
            className="u-padding-x--md u-padding-y"
            data-test="search-input-clear-button"
            onClick={this.handleClear}
          >
            <div className={clearButtonClassName}>
              <CrossIcon />
            </div>
          </div>
        )}
        {hasFocus && (
          <div
            className="c-search-input__scroll-capture"
            onTouchStart={this.handleScroll}
          />
        )}
      </Flex>
    );
  }
}

export default SearchInput;
