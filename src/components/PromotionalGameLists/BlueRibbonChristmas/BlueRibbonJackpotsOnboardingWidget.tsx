import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { Link } from "@reach/router";
import classNames from "classnames";
import * as React from "react";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
} from "Src/constants";
import { CloseButton as CloseBtn } from "../../AbstractModal/CloseButton";
import type { PotObject } from "./blueRibbonConsts";

type JackpotOnboardingWidget = {
  title: string;
  body: string;
  cta: string;
  backgroundImage: string;
  ctaLink: string;
};
export function BlueRibbonJackpotsOnboardingWidget({
  content,
  composedPots,
  widgetColor,
  onClose,
}: {
  content: JackpotOnboardingWidget;
  composedPots: Array<PotObject>;
  widgetColor: {
    dark?: string;
    light?: string;
  };
  onClose: () => void;
}) {
  return (
    <Flex
      direction="vertical"
      justify="top"
      className={`o-position--relative u-padding--md t-border-r--md u-overflow--hidden u-margin-left`}
      style={{
        backgroundColor: widgetColor.light,
        backgroundImage: content.backgroundImage
          ? `url('${content.backgroundImage}')`
          : "none",
        width: topListWidgetWidth,
        height:
          composedPots.length < 3
            ? topListWidgetHeightTwoRows
            : topListWidgetHeight,
      }}
    >
      <Flex
        direction="horizontal"
        justify="end"
        className={classNames("u-margin-bottom--sm")}
      >
        <CloseBtn className="u-cursor--pointer" onClick={onClose} />
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

      <Link
        className="u-font-weight-bold text-grey-90 t-background-white u-text-align-center u-padding--md t-border-r--lg"
        to={content.ctaLink}
      >
        {content.cta}
      </Link>
    </Flex>
  );
}
