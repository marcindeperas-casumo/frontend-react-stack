// @flow
import * as React from "react";
import { useLocale } from "Utils/hooks";
import {
  useSessionsState,
  type UseSessionsStateType,
} from "Models/slotControlSystem";
import { type ModalContentComponent } from "Components/RSModal";
import {
  SessionDetails,
  TYPES as DETAILS_TYPES,
} from "Components/Compliance/SlotControlSystem/SessionDetails";
import { ModalHeader } from "../RSModalHeader";

type ContentType = {
  session_details_header: string,
  balance: string,
  money_wagered: string,
  money_won: string,
  money_left: string,
  play_started: string,
  play_ended: string,
  last_status_alert: string,
  limits_reached_play_again_header: string,
  limits_reached_button_label: string,
  limits_reached_modal_title: string,
  limits_reached_exclusion_text: string,
  logout_button_label: string,
  logout_text: string,
  logout_modal_title: string,
};

export function BeforeLoggingOut(props: ModalContentComponent<ContentType>) {
  const { activeSession }: UseSessionsStateType = useSessionsState();
  const locale = useLocale();
  const now = Date.now();

  React.useEffect(() => {
    if (!activeSession) {
      props.acceptModal();
    }
  }, [activeSession]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!activeSession) {
    return null;
  }

  return (
    <>
      <ModalHeader
        title={props.t?.logout_modal_title}
        showCloseButton
        closeAction={props.acceptModal}
      />
      <div className="u-padding-x--lg@tablet u-padding-bottom--lg@tablet u-overflow-y--auto">
        <SessionDetails
          t={props.t}
          type={DETAILS_TYPES.LOGOUT}
          locale={locale}
          balance={activeSession.limit.amount}
          currency={activeSession.limit.currency}
          moneyWagered={10}
          moneyWon={100}
          moneyLeft={1000}
          playStarted={activeSession.startedTime}
          playEnded={now}
          lastStatusAlert={now}
          onClickButton={props.acceptModal}
        />
      </div>
    </>
  );
}
