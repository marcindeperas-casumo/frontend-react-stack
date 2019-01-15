/* @flow */

import * as React from "react";
import classNames from "classnames";
import { omit, pathOr } from "ramda";

import { CrossIcon, SearchIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";

import "Styles/_component.SearchInput.scss";

type Props = {
  value: string,
  [key: string]: any,
  onClear: () => void,
  children?: empty,
};

type State = {
  hasFocus: boolean,
};
// eslint-disable-next-line fp/no-let
let counter = 0;

class SearchInput extends React.Component<Props, State> {
  _id: ?string;
  textInput: { current: null | HTMLInputElement };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line fp/no-mutation
    this.textInput = React.createRef();
    // eslint-disable-next-line fp/no-mutation
    this.state = { hasFocus: false };

    if (!this.props.id) {
      // eslint-disable-next-line fp/no-mutation
      this._id = `searchInput${counter++}`;
    }
  }

  get currentTextInput() {
    return pathOr(
      { id: null, focus: () => {} },
      ["textInput", "current"],
      this
    );
  }

  handleClear = () => {
    this.currentTextInput.focus();

    this.props.onClear();
  };

  setFocusState = (hasFocus: boolean) => () => this.setState({ hasFocus });

  render() {
    const { id = this._id, value } = this.props;
    const { hasFocus } = this.state;

    const isSearchTermNonEmpty = Boolean(value);
    const hasNoResults = false; // @CPO: how do I do this without polluting everything with state?

    const inputClassName = classNames(
      "c-search-input o-flex--1 u-padding-left",
      hasFocus ? "t-color-grey-dark-3" : "t-color-grey",
      isSearchTermNonEmpty
        ? "u-font-weight-bold u-font"
        : "u-font-weight-normal"
    );

    const searchButtonClassName = classNames(
      "c-search-input__clear-button",
      hasNoResults ? "t-background-grey-dark-3" : "t-background-grey"
    );

    return (
      <Flex
        align="center"
        className="t-background-white u-padding-vert u-padding-horiz--md t-border-r--pill"
      >
        <label htmlFor={id}>
          <SearchIcon
            size="med"
            className={hasFocus ? "t-color-grey-dark-1" : "t-color-grey"}
          />
        </label>
        <input
          ref={this.textInput}
          id={id}
          className={inputClassName}
          type="text"
          onBlur={this.setFocusState(false)}
          onFocus={this.setFocusState(true)}
          {...omit(["onClear"], this.props)}
        />
        {isSearchTermNonEmpty && (
          <div className={searchButtonClassName}>
            <CrossIcon onClick={this.handleClear} />
          </div>
        )}
      </Flex>
    );
  }
}

export default SearchInput;
