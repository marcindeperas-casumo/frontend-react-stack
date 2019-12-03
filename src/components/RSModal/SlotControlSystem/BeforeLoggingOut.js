// @flow
import * as React from "react";
import { useLocale } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
import { type ModalContentComponent } from "Components/RSModal";
import { SessionDetails } from "Components/Compliance/SlotControlSystem/SessionDetails";
import { ModalSkin } from "./ModalSkin";

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
  const { activeSession, isFresh } = useSessionsState();
  const locale = useLocale();
  const now = Date.now();
  const modalSkinProps = {
    ...props,
    t: {
      modal_title: props.t?.logout_modal_title || "",
    },
  };

  React.useEffect(() => {
    if (!activeSession && isFresh) {
      props.acceptModal();
    }
  }, [activeSession, isFresh]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!activeSession) {
    return null;
  }

  return (
    // Flow thinks modalSkinProps are the same type as props and
    // that props should contain modal_title
    // $FlowFixMe
    <ModalSkin {...modalSkinProps}>
      <SessionDetails
        t={props.t}
        isLogout
        locale={locale}
        balance={activeSession.limit.amount}
        currency={activeSession.limit.currency}
        // TODO bind proper data when available in API
        moneyWagered={10}
        moneyWon={100}
        moneyLeft={1000}
        playStarted={activeSession.startedTime}
        playEnded={now}
        // TODO bind proper data when available in API
        lastStatusAlert={now}
        onClickButton={props.acceptModal}
      />
    </ModalSkin>
  );
}
