// @flow
import * as React from "react";
import Button from "@casumo/cmp-button";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW } from "Src/constants";
import { LimitHeader } from "Components/Compliance/LimitHeader";
import SuspendAccountIcon from "./suspendAccount.svg";

type Props = {
  t: {
    suspend_account: string,
    add: string,
  },
  showOldSuspendAccountView: void => void,
};

export function DepositLimitsSuspendAccount({ t, ...props }: Props) {
  if (!t) {
    return null;
  }

  return (
    <LimitHeader title={t.suspend_account} icon={<SuspendAccountIcon />}>
      <Button
        data-test-id="suspendAccountButton"
        onClick={() => {
          bridge.emit(KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW, "suspendAccount");
          props.showOldSuspendAccountView();
        }}
        variant="secondary"
      >
        {t.add}
      </Button>
    </LimitHeader>
  );
}
