import Text from "@casumo/cmp-text";
import React from "react";
import classNames from "classnames";

export default function SectionTitle({ title }) {
  return (
    <Text
      className={classNames(
        "u-padding-bottom--lg",
        "u-padding-top--lg",
        "u-font-weight-bold",
        "t-color-grey-50"
      )}
      size="md"
      tag="h3"
    >
      {title}
    </Text>
  );
}
