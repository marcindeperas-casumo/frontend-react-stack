// @flow
import * as React from "react";
import classNames from "classnames";
import { pick } from "ramda";

import Flex from "@casumo/cmp-flex";
import { CrossIcon, SearchIcon } from "@casumo/cmp-icons";

import "./SearchInput.scss";

// relevant props from input field we wish to expose
type InputProps = {
  autofocus?: boolean,
  name?: string,
  value: string,
  placeholder?: string,
};

type SearchInputProps = {
  children?: empty,
  id?: string,
  [key: string]: any,
  onClear: () => void,
  onChange: () => void,
  onFocus: () => void,
};

type Props = InputProps & SearchInputProps;

type State = {
  hasFocus: boolean,
};

class SearchInput extends React.Component<Props, State> {
  state = { hasFocus: false };
  textInput: { current: ?HTMLInputElement } = React.createRef();

  get inputProps() {
    return pick(["autofocus", "name", "value"], this.props);
  }

  focus = () => {
    if (this.textInput.current) {
      this.textInput.current.focus();
    }
  };

  blur = () => {
    if (this.textInput.current) {
      this.textInput.current.focus();
    }
  };

  handleClear = () => {
    this.focus();
    this.props.onClear();
  };

  // captures when a user touches an invisible div and
  // blurs the input to hide the mobile keyboard
  handleScroll = () => {
    this.setState({ hasFocus: false });
    this.blur();
  };

  onFocus = () => {
    this.props.onFocus();
    this.setState({ hasFocus: true });
  };

  render() {
    const { id = "c-search-input", value } = this.props;
    const { hasFocus } = this.state;

    const hasSearchTerm = Boolean(value);

    const inputClassName = classNames(
      "c-search-input o-flex--1 u-padding-left",
      hasFocus ? "t-color-grey-dark-3" : "t-color-grey",
      hasSearchTerm ? "u-font-weight-bold u-font" : "u-font-weight-normal"
    );

    return (
      <Flex
        align="center"
        className="t-background-white u-padding-vert u-padding-horiz--md t-border-r--pill"
      >
        <label htmlFor={id} />
        <SearchIcon
          size="med"
          className={hasFocus ? "t-color-grey-dark-1" : "t-color-grey"}
        />
        <input
          id={id}
          ref={this.textInput}
          className={inputClassName}
          type="text"
          onBlur={() => this.setState({ hasFocus: false })}
          onFocus={this.onFocus}
          {...this.inputProps}
        />
        {hasSearchTerm && (
          <div
            className="c-search-input__clear-button t-background-grey t-color-white t-border-r--circle"
            onClick={this.handleClear}
          >
            <CrossIcon />
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
