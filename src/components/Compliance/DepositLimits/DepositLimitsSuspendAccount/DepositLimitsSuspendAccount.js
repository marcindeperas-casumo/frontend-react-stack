// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CrossIcon } from "@casumo/cmp-icons";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW } from "Src/constants";
import SuspendAccountIcon from "./suspendAccount.svg";

type Props = {
  t: {
    main_title: string,
  },
  fetchTranslations: void => void,
  showOldSuspendAccountView: void => void,
};

export function DepositLimitsSuspendAccount({ t, ...props }: Props) {
  React.useEffect(() => {
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!t) {
    return null;
  }

  return (
    <Flex
      align="center"
      justify="space-between"
      spacing="none"
      className="u-padding--md t-background-white u-margin-y--lg"
      onClick={() => {
        bridge.emit(KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW, "suspendAccount");
        props.showOldSuspendAccountView();
      }}
    >
      <Flex
        justify="center"
        align="center"
        spacing="none"
        className="u-margin-right--md u-padding t-border-r--circle"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <SuspendAccountIcon />
      </Flex>
      <Text tag="span" className="o-flex--1">
        {t.main_title}
      </Text>
      <CrossIcon className="t-color-grey-light-1 c-deposit-limits__x-icon" />
    </Flex>
  );
}
