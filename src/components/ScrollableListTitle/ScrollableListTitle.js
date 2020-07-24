// @flow
import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  /** The text to show */
  title: ?string,
  /** Whether applying padding left or not */
  paddingLeft?: boolean,
};

export default function ScrollableListTitle({ title, paddingLeft }: Props) {
  const paddingLeftClasses =
    "u-padding-left--md u-padding-left--3xlg@tablet u-padding-left--3xlg@desktop";
  return (
    <Text
      className={classNames(
        "u-padding-bottom--md",
        "u-padding-bottom--lg@tablet",
        "u-padding-bottom--lg@desktop",
        "t-color-grey-90",
        "u-font-weight-bold",
        { [paddingLeftClasses]: paddingLeft }
      )}
      data-test="scrollable-list-title"
      tag="h3"
    >
      <DangerousHtml html={title || ""} />
    </Text>
  );
}
