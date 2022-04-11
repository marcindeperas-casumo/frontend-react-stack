import * as React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { useManualJackpotOptInAndOptOut } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { Toggle } from "Components/Toggle/Toggle";
import { useTranslations } from "Utils/hooks";
import { JackpotTermsAndConditionsLink } from "Components/JackpotDetailPage/JackpotTermsAndConditionsLink";
import { isDesktop } from "Components/ResponsiveLayout";

export const BlueRibbonManualOptInAndOptOut = (props: {
  jackpotSlug: string;
  isLight?: boolean;
  gameSlug?: string;
}) => {
  const t = useTranslations<{
    opt_in_contribution_value: string;
    opt_in_cta: string;
    opt_in_notification_content: string;
    opt_in_notification_title: string;
    opt_in_t_and_c_apply: string;
    jackpot_image: string;
  }>(`jackpots-configs.${props.jackpotSlug}`);
  const { optIn, optOut, status } = useManualJackpotOptInAndOptOut(
    props.jackpotSlug,
    props.gameSlug
  );
  const textColor = props.isLight ? "text-black" : "text-white";
  const desktopClassesComposition =
    "t-border-r-top-left--md t-border-r-top-right--md";
  if (!t) {
    return null;
  }

  const isInGame: boolean = Boolean(props.gameSlug);

  return (
    <Flex
      direction="horizontal"
      justify="flex-start"
      align="center"
      className={classNames(
        isDesktop() ? desktopClassesComposition : "",
        {
          "bg-grey-90": !props.isLight,
          "bg-white": props.isLight,
          p: isInGame,
          py: !isInGame,
        },
        "c-br-footer-widget__container-border-r"
      )}
    >
      <Flex.Item className={classNames({ hidden: isInGame })}>
        <img
          className="u-display--block t-border-r--circle"
          width={36}
          height={36}
          alt=""
          src={t.jackpot_image}
        />
      </Flex.Item>
      <Flex
        direction="vertical"
        className={classNames("o-fl ex--wrap ml-md", {
          "mr-md": isInGame,
        })}
        justify="center"
        spacing="sm"
      >
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
      <Flex className={classNames("ml-auto", { "mr-md": isInGame })}>
        <Toggle checked={status} onChange={status ? optOut : optIn} translate />
      </Flex>
    </Flex>
  );
};
