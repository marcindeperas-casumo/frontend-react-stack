// @flow
import * as React from "react";
import Button from "@casumo/cmp-button";
import classNames from "classnames";
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
  className?: string,
};

export function DepositLimitsSuspendAccount({ t, ...props }: Props) {
  if (!t) {
    return null;
  }

  return (
    <div
      className={classNames(
        "t-border-r--none@mobile t-border-r u-overflow-hidden u-margin-bottom--lg",
        props.className
      )}
    >
      <LimitHeader title={t.suspend_account} icon={<SuspendAccountIcon />}>
        <Button
          data-test-id="suspendAccountButton"
          onClick={() => {
            bridge.emit(
              KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW,
              "suspendAccount"
            );
            props.showOldSuspendAccountView();
          }}
          variant="secondary"
        >
          {t.add}
        </Button>
      </LimitHeader>
    </div>
  );
}
