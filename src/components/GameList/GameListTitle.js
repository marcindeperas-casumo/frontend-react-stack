import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";

export default function GameListTitle({ title, link }) {
  return (
    <Text
      className={classNames(
        "u-padding-bottom--small",
        "u-padding-bottom--normal@tablet",
        "u-padding-bottom--normal@desktop",
        "u-padding-left--small",
        "u-padding-left--xlarge@tablet",
        "u-padding-left--xlarge@desktop",
        "u-font-weight-bold",
        link && "flex-1"
      )}
      tag="h3"
    >
      {title}
    </Text>
  );
}
