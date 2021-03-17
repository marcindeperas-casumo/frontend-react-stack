import * as React from "react";
import classNames from "classnames";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW } from "Src/constants";
import {
  LimitHeader,
  LimitHeaderButton,
} from "Components/Compliance/LimitHeader";
import SuspendAccountIcon from "./suspendAccount.svg";

type Props = {
  t: {
    suspend_account: string;
    add: string;
  };
  showOldSuspendAccountView: () => void;
  className?: string;
};

export function DepositLimitsSuspendAccount({ t, ...props }: Props) {
  if (!t) {
    return null;
  }

  return (
    <div
      className={classNames(
        "t-border-r--none t-border-r--md@tablet t-border-r--md@desktop u-overflow--hidden u-margin-bottom--lg",
        props.className
      )}
    >
      <LimitHeader title={t.suspend_account} icon={<SuspendAccountIcon />}>
        <LimitHeaderButton
          data-test-id="suspendAccountButton"
          onClick={() => {
            bridge.emit(
              KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW,
              "suspendAccount"
            );
            props.showOldSuspendAccountView();
          }}
        >
          {t.add}
        </LimitHeaderButton>
      </LimitHeader>
    </div>
  );
}
