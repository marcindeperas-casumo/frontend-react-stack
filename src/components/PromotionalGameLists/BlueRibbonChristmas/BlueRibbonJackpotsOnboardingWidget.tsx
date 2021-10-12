import Flex from "@casumo/cmp-flex";
import * as React from "react";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
} from "Src/constants";
import type { PotObject } from "./blueRibbonConsts";

type JackpotOnboardingWidget = {
  title: string;
  body: string;
  cta: string;
};
export function BlueRibbonJackpotsOnboardingWidget({
  content,
  composedPots,
  widgetColor,
}: {
  content: JackpotOnboardingWidget;
  composedPots: Array<PotObject>;
  widgetColor: {
    dark?: string;
    light?: string;
  };
}) {
  return (
    <Flex
      direction="vertical"
      justify="center"
      className={`o-position--relative o-flex__item--no-shrink u-padding t-border-r--md u-overflow--hidden`}
      style={{
        backgroundColor: widgetColor.light,
        width: topListWidgetWidth,
        height:
          composedPots.length < 3
            ? topListWidgetHeightTwoRows
            : topListWidgetHeight,
      }}
    >
      {content.title}
      {content.body}
      {content.cta}
    </Flex>
  );
}
