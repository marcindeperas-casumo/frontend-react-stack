// @flow
import * as React from "react";
import { omit } from "ramda";
import { useLocale, useJurisdiction } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
// @ts-expect-error ts-migrate(2305) FIXME: Module '".."' has no exported member 'type'.
import { type ModalContentComponent } from "Components/RSModal";
import { SessionDetailsForLogout } from "Components/Compliance/SlotControlSystem/SessionDetails";
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
  logout_button_label: string,
  logout_text: string,
  logout_modal_title: string,
};

export function BeforeLoggingOut(props: ModalContentComponent<ContentType>) {
  const { activeSession, isSynced, isFetching } = useSessionsState();
  const { isDGOJ } = useJurisdiction();
  const locale = useLocale();
  const tForModalSkin = {
    modal_title: props.t?.logout_modal_title || "",
  };

  React.useEffect(() => {
    if (!activeSession && isSynced && !isFetching && !isDGOJ) {
      props.acceptModal();
    }
  }, [activeSession, isSynced, isFetching, isDGOJ]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isDGOJ) {
    return null;
  }

  return (
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'dismissModal' is missing in type '{ chil... Remove this comment to see the full error message
    <ModalSkin
      {...omit(["t"], props)}
      t={tForModalSkin}
      closeAction={props.acceptModal}
    >
      <SessionDetailsForLogout
        t={props.t}
        locale={locale}
        playEndedTime={Date.now()}
        onClickButton={props.acceptModal}
        activeSession={activeSession}
      />
    </ModalSkin>
  );
}
