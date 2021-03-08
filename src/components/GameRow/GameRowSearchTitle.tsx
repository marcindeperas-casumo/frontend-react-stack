import Text from "@casumo/cmp-text";
import React, { PureComponent } from "react";
import MaskText from "Components/MaskText";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  /** The search query */
  query?: string;
  /** The text to render */
  name: string;
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean;
  /** Whether the game is in maintenance mode or not */
  isInMaintenance: boolean;
};

const TextMatch = value => (
  <span className="t-color-grey-70">
    <DangerousHtml html={value} />
  </span>
);
const TextNotMatch = value => (
  <span className="t-color-grey-20">
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
            className={`t-color-grey-${isInMaintenance ? "5" : "70"}`}
            html={name}
          />
        )}
      </Text>
    );
  }
}
