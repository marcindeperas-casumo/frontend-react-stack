import * as React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { useManualJackpotOptInAndOptOut } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { Toggle } from "Components/Toggle/Toggle";
import { useTranslations } from "Utils/hooks";

export const BlueRibbonManualOptInAndOptOut = (props: {
  jackpotSlug: string;
  isLight?: boolean;
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

  return (
    <Flex
      direction="horizontal"
      justify="space-between"
      align="center"
      className={classNames("u-padding-x u-padding-y--md", {
        "bg-grey-90": !props.isLight,
        "bg-white": props.isLight,
      })}
    >
      <Flex direction="vertical">
        <Flex direction="horizontal">
          <Text
            tag="span"
            size="xs"
            className={classNames(
              "u-font-weight-bold u-display--flex",
              textColor
            )}
          >
            {t.opt_in_cta}
          </Text>
          <Text
            tag="span"
            size="xs"
            className="u-padding-left--sm text-blue-50 u-display--flex"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log("T&C modal not wired up");
            }}
          >
            {t.opt_in_t_and_c_apply}
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
      <Toggle
        labelOn="ON"
        labelOff="OFF"
        checked={status}
        onChange={status ? optOut : optIn}
      />
    </Flex>
  );
};
