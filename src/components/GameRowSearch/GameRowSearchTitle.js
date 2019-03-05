// @flow
import React, { PureComponent } from "react";
import MaskText from "Components/MaskText";
import DangerousHtml from "Components/DangerousHtml";
import Text from "@casumo/cmp-text";

type Props = {
  /** The search query */
  query?: string,
  /** The text to render */
  name: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
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

export default class GameRowSearchTitle extends PureComponent<Props> {
  render() {
    const { query, name, highlightSearchQuery } = this.props;

    return (
      <Text className="u-font-weight-bold u-font" tag="div" size="sm">
        {highlightSearchQuery && query ? (
          <TextMaskColored text={name} search={query} />
        ) : (
          <DangerousHtml className="t-color-grey-dark-2" html={name} />
        )}
      </Text>
    );
  }
}