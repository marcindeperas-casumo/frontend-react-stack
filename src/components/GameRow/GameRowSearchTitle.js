// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import MaskText from "Components/MaskText";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  /** The search query */
  query?: string,
  /** The text to render */
  name: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
  /** Whether the game is in maintenance mode or not */
  isInMaintenance: boolean,
};

const TextMatch = value => (
  <span className="t-color-grey-dark-2">
    <DangerousHtml html={value} />
  </span>
);
const TextNotMatch = value => (
  <span className="t-color-grey">
    <DangerousHtml html={value} />
  </span>
);

const TextMaskColored = props => (
  <MaskText matchRender={TextMatch} unmatchedRender={TextNotMatch} {...props} />
);

export class GameRowSearchTitle extends PureComponent<Props> {
  render() {
    const { query, name, highlightSearchQuery, isInMaintenance } = this.props;

    return (
      <Text className="u-font-weight-bold" tag="div" size="sm">
        {highlightSearchQuery && query ? (
          <TextMaskColored text={name} search={query} />
        ) : (
          <DangerousHtml
            className={`t-color-grey-${isInMaintenance ? "light-1" : "dark-2"}`}
            html={name}
          />
        )}
      </Text>
    );
  }
}
