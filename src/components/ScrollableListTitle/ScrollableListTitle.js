// @flow
import React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import DangerousHtml from "Components/DangerousHtml";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

type Props = {
  /** The text to show */
  title: ?string,
  /** Whether applying padding left or not */
  paddingLeft?: boolean,
  /** Size to apply on padding left */
  paddingPerDevice?: spacerSizes | responsiveSpacerSizes,
};

export default function ScrollableListTitle({
  title,
  paddingLeft,
  paddingPerDevice,
}: Props) {
  const paddingLeftClasses = cx(
    paddingLeft &&
      createModifierClasses(
        "u-padding-left",
        paddingPerDevice || PADDING_PER_DEVICE
      )
  );

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
