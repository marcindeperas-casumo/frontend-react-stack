import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { useTranslations } from "Utils/hooks";

export function BlueRibbonOptInNotification(props: {
  jackpotSlug: string;
  onClose: () => void;
}) {
  const t = useTranslations<{
    opt_in_contribution_value: string;
    opt_in_cta: string;
    opt_in_notification_content: string;
    opt_in_notification_title: string;
    opt_in_t_and_c_apply: string;
    jackpot_image: string;
  }>(`jackpots-configs.${props.jackpotSlug}`);

  return (
    <Flex
      direction="horizontal"
      className="u-padding--md bg-white t-border-r"
      spacing="md"
    >
      <Flex.Item className="o-position--relative">
        <img
          className="u-display--block t-border-r--circle"
          width={56}
          height={56}
          alt=""
          src={t.jackpot_image}
        />
      </Flex.Item>
      <Flex.Block>
        <Text
          tag="span"
          className="u-padding-bottom--sm text-black u-font-weight-bold u-display--flex"
        >
          {t.opt_in_notification_title}
        </Text>
        <Text tag="span" className="text-grey-50 u-display--flex">
          {t.opt_in_notification_content}
        </Text>
      </Flex.Block>
      <Flex.Item>
        <div
          onClick={props.onClose}
          className="t-border-r--circle u-padding u-cursor--pointer"
        >
          <CloseIcon className="text-black" />
        </div>
      </Flex.Item>
    </Flex>
  );
}
