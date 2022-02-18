import Flex from "@casumo/cmp-flex";
import * as React from "react";
import { topListWidgetWidth, topListWidgetHeight } from "Src/constants";
import { PromotionalGameList } from "./PromotionalGameListsContainer";

export function PromotionalGameListWidget({
  content,
}: {
  content: PromotionalGameList;
}) {
  return (
    <Flex
      direction="vertical"
      justify="end"
      className="o-position--relative u-padding--md t-border-r--md u-overflow--hidden u-margin-left"
      style={{
        backgroundImage: content.background_image
          ? `url('${content.background_image}')`
          : "none",
        width: topListWidgetWidth,
        height: topListWidgetHeight,
        backgroundSize: "cover",
      }}
    >
      <Flex
        direction="horizontal"
        justify="space-between"
        align="center"
        className="u-height--4xlg u-width--full o-position--absolute o-inset-bottom--none o-inset-left--none u-padding-right u-padding-left"
        style={{
          backgroundColor: content.sticker_background_color || "",
        }}
      >
        <a
          className="u-font-weight-bold text-grey-90 u-font-xs t-color-white"
          href={content.terms_and_conditions_url}
        >
          {content.terms_and_conditions_text}
        </a>
        <a
          className="u-font-weight-bold text-grey-90 t-background-white u-text-align-center u-padding-y u-padding-x--md t-border-r--lg u-font-sm"
          href={content.read_more_link}
        >
          {content.read_more_text}
        </a>
      </Flex>
    </Flex>
  );
}
