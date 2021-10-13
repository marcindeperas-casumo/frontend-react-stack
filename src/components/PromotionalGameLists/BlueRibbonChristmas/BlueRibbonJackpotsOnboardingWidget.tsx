import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import { ButtonPrimary } from "@casumo/cmp-button";
import classNames from "classnames";
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
      justify="top"
      className={`o-position--relative o-flex__item--no-shrink u-padding--md t-border-r--md u-overflow--hidden u-margin-left`}
      style={{
        backgroundColor: widgetColor.light,
        width: topListWidgetWidth,
        height:
          composedPots.length < 3
            ? topListWidgetHeightTwoRows
            : topListWidgetHeight,
      }}
    >
      <Flex direction="horizontal" justify="end">
        <CloseIcon
          className="u-padding-x--lg text-black u-cursor--pointer"
          onClick={() => {}}
        />
      </Flex>
      <Text
        size="md"
        className={classNames(
          "u-margin-bottom--lg text-white u-font-weight-bold"
        )}
      >
        {content.title}
      </Text>
      <Text className={classNames("u-margin-bottom--2xlg text-white")}>
        {content.body}
      </Text>

      <ButtonPrimary size="md" onClick={() => {}}>
        {content.cta}
      </ButtonPrimary>
    </Flex>
  );
}
