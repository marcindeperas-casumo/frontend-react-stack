import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";

export default function ScrollableListTitle({ title }) {
  return (
    <Text
      className={classNames(
        "u-padding-bottom--md",
        "u-padding-bottom--lg@tablet",
        "u-padding-bottom--lg@desktop",
        "u-padding-left--md",
        "u-padding-left--2xlg@tablet",
        "u-padding-left--2xlg@desktop",
        "u-font-weight-bold"
      )}
      data-test="scrollable-list-title"
      tag="h3"
    >
      {title}
    </Text>
  );
}
