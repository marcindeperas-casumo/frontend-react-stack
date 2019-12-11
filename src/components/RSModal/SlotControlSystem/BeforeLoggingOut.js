// @flow
import * as React from "react";
import { useLocale } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
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
  const { activeSession, isFresh, isFetching } = useSessionsState();
  const locale = useLocale();
  const modalSkinProps = {
    ...props,
    t: {
      modal_title: props.t?.logout_modal_title || "",
    },
  };

  React.useEffect(() => {
    if (!activeSession && isFresh && !isFetching) {
      props.acceptModal();
    }
  }, [activeSession, isFresh, isFetching]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!activeSession) {
    return null;
  }

  return (
    // Flow thinks modalSkinProps are the same type as props and
    // that props should contain modal_title
    // $FlowFixMe
    <ModalSkin {...modalSkinProps} closeAction={props.acceptModal}>
      <SessionDetailsForLogout
        t={props.t}
        locale={locale}
        onClickButton={props.acceptModal}
        activeSession={activeSession}
      />
    </ModalSkin>
  );
}
