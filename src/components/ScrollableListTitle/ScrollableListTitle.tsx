import Text from "@casumo/cmp-text";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import cx from "classnames";
import React from "react";
import DangerousHtml from "Components/DangerousHtml";
import { leftPaddingClasses } from "Components/GameListHorizontal/constants";

type Props = {
  /** The text to show */
  title: string | undefined;
  /** Whether applying padding left or not */
  paddingLeft?: boolean;
  /** Size to apply on padding left */
  paddingPerDevice?: spacerSizes | responsiveSpacerSizes;
};

export default function ScrollableListTitle({
  title,
  paddingLeft,
  paddingPerDevice,
}: Props) {
  const paddingLeftClasses = cx(paddingLeft && leftPaddingClasses);

  return (
    <Text
      className={cx(
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
