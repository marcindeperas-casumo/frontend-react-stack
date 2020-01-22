// @flow
import * as React from "react";
import { head, endsWith } from "ramda";
import { ROUTE_IDS } from "Src/constants";
import { navigateToRerender } from "Utils";
import { useLocale, useCrossCodebaseNavigation } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
import { useLatestPlayed } from "Models/gameSearch";
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
  const { navigateToKO } = useCrossCodebaseNavigation();
  const locale = useLocale();
  const { latestPlayedIds } = useLatestPlayed();
  const latestPlayedId = head(latestPlayedIds);
  const isPlayRouteActive = endsWith(`${latestPlayedId}/launch`);
  const tForModalSkin = {
    modal_title: props.t?.limits_reached_modal_title || "",
  };
  const onClickButton = () => {
    props.acceptModal();
    navigateToKO(ROUTE_IDS.TOP_LISTS);
  };
  const propsForModalSkin = {
    t: tForModalSkin,
    dismissModal: props.dismissModal,
    closeAction: onClickButton,
  };
  const onClickPlayAgain = e => {
    e.preventDefault();
    if (isPlayRouteActive(window.location.pathname)) {
      // if we're in game iframe, perform soft rerender
      return navigateToRerender();
    }
    // otherwise perform full browser redirect
    navigateToKO(ROUTE_IDS.PLAY, { slug: latestPlayedId });
  };

  if (!lastEndedSession) {
    return null;
  }

  if (activeExclusion) {
    return (
      <ModalSkin {...propsForModalSkin}>
        <SessionDetailsForLimitsReachedExcluded
          t={props.t}
          locale={locale}
          lastEndedSession={lastEndedSession}
          secondsTillEndOfBreak={
            (activeExclusion.expiringTime - Date.now()) / 1000
          }
          onClickButton={onClickButton}
        />
      </ModalSkin>
    );
  }

  return (
    <ModalSkin {...propsForModalSkin}>
      <SessionDetailsForLimitsReached
        t={props.t}
        locale={locale}
        lastEndedSession={lastEndedSession}
        onClickButton={onClickButton}
        playAgainGameId={latestPlayedId}
        onClickPlayAgain={onClickPlayAgain}
      />
    </ModalSkin>
  );
}
