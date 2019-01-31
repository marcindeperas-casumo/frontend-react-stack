import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";

export default function SectionTitle({ title }) {
  return (
    <Text
      className={classNames(
        "u-padding-bottom--lg",
        "u-padding-top--lg",
        "u-font-weight-bold"
      )}
      size="md"
      data-test="game-row-section-list-title"
      tag="h3"
    >
      {title}
    </Text>
  );
}
