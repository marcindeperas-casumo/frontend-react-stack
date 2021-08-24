import * as React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { useManualJackpotOptInAndOptOut } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { Toggle } from "Components/Toggle/Toggle";
import { useTranslations } from "Utils/hooks";
import { JackpotTermsAndConditionsLink } from "Components/JackpotDetailPage/JackpotTermsAndConditionsLink";

export const BlueRibbonManualOptInAndOptOut = (props: {
  jackpotSlug: string;
  isLight?: boolean;
  isDesktop?: boolean;
}) => {
  const t = useTranslations<{
    opt_in_contribution_value: string;
    opt_in_cta: string;
    opt_in_notification_content: string;
    opt_in_notification_title: string;
    opt_in_t_and_c_apply: string;
  }>(`jackpots-configs.${props.jackpotSlug}`);
  const { optIn, optOut, status } = useManualJackpotOptInAndOptOut(
    props.jackpotSlug
  );
  const textColor = props.isLight ? "text-black" : "text-white";
  const { isDesktop } = props;
  const desktopClassesComposition =
    "t-border-r-top-left--md t-border-r-top-right--md u-padding-left--lg u-padding-right--lg";
  if (!t) {
    return null;
  }

  return (
    <Flex
      direction="horizontal"
      justify="space-between"
      align="center"
      className={classNames(
        isDesktop ? desktopClassesComposition : "",
        "u-padding",
        {
          "bg-grey-90": !props.isLight,
          "bg-white": props.isLight,
        },
        "c-br-footer-widget__container-border-r"
      )}
    >
      <Flex direction="vertical" className="o-flex--wrap">
        <Flex direction="horizontal" className="o-flex--wrap" spacing="sm">
          <Text
            tag="span"
            size="xs"
            className={classNames(
              "u-font-weight-bold",
              "u-padding-right--sm",
              textColor
            )}
          >
            {t.opt_in_cta}
          </Text>
          <Text tag="span" size="xs" className="text-blue-50 o-flex__block">
            <JackpotTermsAndConditionsLink
              text={t.opt_in_t_and_c_apply}
              jackpotSlug={props.jackpotSlug}
            />
          </Text>
        </Flex>
        <Text
          size="xs"
          tag="span"
          className={classNames("u-display--flex", textColor)}
        >
          {t.opt_in_contribution_value}
        </Text>
      </Flex>
      <Flex className={classNames("u-margin-left--md")}>
        <Toggle checked={status} onChange={status ? optOut : optIn} translate />
      </Flex>
    </Flex>
  );
};
