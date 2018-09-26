import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";

export default function GameListTitle({ title, link }) {
  return (
    <Text
      className={classNames(
        "u-padding-bottom--md",
        "u-padding-bottom--lg@tablet",
        "u-padding-bottom--lg@desktop",
        "u-padding-left--md",
        "u-padding-left--2xlg@tablet",
        "u-padding-left--2xlg@desktop",
        "u-font-weight-bold",
        link && "flex-1"
      )}
      tag="h3"
    >
      {title}
    </Text>
  );
}
