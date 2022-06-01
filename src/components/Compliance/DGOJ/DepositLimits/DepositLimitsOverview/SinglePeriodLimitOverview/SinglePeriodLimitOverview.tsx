import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonText } from "@casumo/cmp-button";
import { ArrowRightIcon, MoreIcon } from "@casumo/cmp-icons";
import classNames from "classnames";
import * as React from "react";
import type { DepositKinds } from "Models/playOkay/dgojDepositLimits";
import { ProgressArc } from "Components/Progress";
import { formatCurrency, interpolate } from "Utils";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import "./singlePeriodLimitOverview.scss";
import { TCurrencyCode } from "Src/constants";

type Props = {
  t: {
    daily_short: string;
    weekly_short: string;
    monthly_short: string;
    remaining_limit: string;
    adjust_limit: string;
  };
  currency: TCurrencyCode;
  locale: string;
  progressPercentage: number;
  shouldRenderSeparator: boolean;
  limitKind: DepositKinds;

  value: number;
  remaining: number | undefined;
  onClick: () => void;
};

export function SinglePeriodLimitOverview(props: Props) {
  const { t } = props;
  const currentLimitValue = formatCurrency({
    locale: props.locale,
    currency: props.currency,
    value: props.value,
  });
  const remainingLimitValue = interpolate(t.remaining_limit, {
    value: formatCurrency({
      locale: props.locale,
      currency: props.currency,
      value: props.remaining,
    }),
  });

  return (
    <>
      <MobileAndTablet>
        <Flex
          onClick={props.onClick}
          spacing="none"
          className="u-padding-x--md bg-white"
          align="center"
        >
          <ProgressArc value={props.progressPercentage} />
          <Flex
            align="center"
            justify="space-between"
            className={classNames(
              "u-margin-left u-padding-y--md o-flex--1",
              props.shouldRenderSeparator && "t-border-bottom border-grey-5"
            )}
          >
            <Flex direction="vertical">
              <Text tag="span">
                {currentLimitValue} {t[`${props.limitKind}_short`]}
              </Text>
              <Text tag="span" size="sm" className="text-teal-50">
                {remainingLimitValue}
              </Text>
            </Flex>
            <ArrowRightIcon className="text-grey-0" />
          </Flex>
        </Flex>
      </MobileAndTablet>
      <Desktop>
        <Flex
          onClick={props.onClick}
          className="t-border-r--md u-padding--2xlg u-margin--md o-flex--1 o-position--relative bg-white"
          align="center"
          justify="center"
          direction="vertical"
        >
          <Flex
            align="center"
            justify="center"
            className="o-position--relative"
          >
            <ProgressArc value={props.progressPercentage} />
            <Text
              size="2xs"
              className="o-position--absolute u-text-transform-uppercase u-font-weight-black u-padding-top"
            >
              {t[`${props.limitKind}_short`]}
            </Text>
            <Flex className="o-position--absolute u-padding--sm bg-grey-0 t-border-r--circle c-single-limit__more-icon">
              <MoreIcon size="default" />
            </Flex>
          </Flex>
          <Text size="lg" className="u-font-weight-black">
            {currentLimitValue}
          </Text>
          <Text size="sm" className="text-teal-50">
            {remainingLimitValue}
          </Text>
          <Flex
            align="center"
            justify="center"
            className="c-single-limit__hovered u-height--full u-width--full t-border-r o-position--absolute u-padding--lg"
          >
            <ButtonText size="md" className="u-width--full">
              {t.adjust_limit}
            </ButtonText>
          </Flex>
        </Flex>
      </Desktop>
    </>
  );
}
