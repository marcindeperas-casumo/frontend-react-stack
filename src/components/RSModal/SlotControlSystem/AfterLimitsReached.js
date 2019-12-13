// @flow
import * as React from "react";
import { useLocale } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
import { type ModalContentComponent } from "Components/RSModal";
import {
  SessionDetailsForLimitsReached,
  SessionDetailsForLimitsReachedExcluded,
} from "Components/Compliance/SlotControlSystem/SessionDetails";
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
  limits_reached_button_label: string,
  limits_reached_exclusion_text: string,
  limits_reached_play_again_header: string,
  limits_reached_modal_title: string,
};

export function AfterLimitsReached(props: ModalContentComponent<ContentType>) {
  const { activeExclusion, lastEndedSession } = useSessionsState();
  const locale = useLocale();
  const modalSkinProps = {
    ...props,
    t: {
      modal_title: props.t?.limits_reached_modal_title || "",
    },
  };

  if (!lastEndedSession) {
    return null;
  }

  if (activeExclusion) {
    return (
      // Flow thinks modalSkinProps are the same type as props and
      // that props should contain modal_title
      // $FlowFixMe
      <ModalSkin {...modalSkinProps} closeAction={props.acceptModal}>
        <SessionDetailsForLimitsReachedExcluded
          t={props.t}
          locale={locale}
          lastEndedSession={lastEndedSession}
          secondsTillEndOfBreak={
            (activeExclusion.expiringTime - Date.now()) / 1000
          }
          onClickButton={props.acceptModal}
        />
      </ModalSkin>
    );
  }

  return (
    // Flow thinks modalSkinProps are the same type as props and
    // that props should contain modal_title
    // $FlowFixMe
    <ModalSkin {...modalSkinProps} closeAction={props.acceptModal}>
      <SessionDetailsForLimitsReached
        t={props.t}
        locale={locale}
        lastEndedSession={lastEndedSession}
        onClickButton={props.acceptModal}
        // TODO retrieve correct game id
        playAgainGameId="gonzos-quest"
      />
    </ModalSkin>
  );
}
