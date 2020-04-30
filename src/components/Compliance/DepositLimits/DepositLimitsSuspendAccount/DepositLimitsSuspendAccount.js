// @flow
import * as React from "react";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_SPAWN_OLD_PLAY_OKAY_VIEW } from "Src/constants";
import {
  LimitHeader,
  LimitHeaderButton,
} from "Components/Compliance/LimitHeader";
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
    <div className="t-border-r--none@mobile t-border-r u-overflow-hidden u-margin-bottom--lg">
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
