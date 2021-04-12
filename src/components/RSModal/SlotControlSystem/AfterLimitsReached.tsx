import { useQuery } from "@apollo/client";
import * as React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { path } from "ramda";
import * as A from "Types/apollo";
import { ROUTE_IDS } from "Src/constants";
import { navigateToRerender } from "Utils";
import { useLocale, useCrossCodebaseNavigation } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
import { playingSelector } from "Models/playing";
import type { ModalContentComponent } from "Components/RSModal";
import {
  SessionDetailsForLimitsReached,
  SessionDetailsForLimitsReachedExcluded,
} from "Components/Compliance/SlotControlSystem/SessionDetails";
import { ModalSkin } from "./ModalSkin";
import {
  PlayAgainGameBySlugQuery,
  PlayAgainLatestPlayedQuery,
} from "./AfterLimitsReached.graphql";

type ContentType = {
  session_details_header: string;
  balance: string;
  money_wagered: string;
  money_won: string;
  money_left: string;
  play_started: string;
  play_ended: string;
  last_status_alert: string;
  limits_reached_button_label: string;
  limits_reached_exclusion_text: string;
  limits_reached_play_again_header: string;
  limits_reached_modal_title: string;
};

export function AfterLimitsReached(props: ModalContentComponent<ContentType>) {
  const { activeExclusion, lastEndedSession } = useSessionsState();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const locale = useLocale();
  const playing = useSelector(playingSelector, shallowEqual);
  const gameSlug = playing?.gameId;
  const isPlayRouteActive = Boolean(gameSlug);
  const gameQueryProps = useQuery<
    A.PlayAgainGameBySlugQuery,
    A.PlayAgainGameBySlugQueryVariables
  >(PlayAgainGameBySlugQuery, {
    skip: !isPlayRouteActive,
    variables: { slug: gameSlug || "" },
  });
  const gameBySlug = path(["data", "gamesBySlugs", 0])(gameQueryProps) as
    | A.AfterLimitsReached_GameFragment
    | undefined;
  const latestPlayedQueryProps = useQuery<
    A.PlayAgainLatestPlayedQuery,
    A.PlayAgainLatestPlayedQueryVariables
  >(PlayAgainLatestPlayedQuery, {
    skip: isPlayRouteActive,
  });
  const gameById = path(["data", "gamesList", "games", 0])(
    latestPlayedQueryProps
  ) as A.AfterLimitsReached_GameFragment | undefined;

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
    if (isPlayRouteActive) {
      // if we're in game iframe, perform soft rerender
      return navigateToRerender();
    }
    // otherwise perform full browser redirect
    if (gameById) {
      return navigateToKO(ROUTE_IDS.PLAY, { slug: gameById.slug });
    }
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
          endTime={activeExclusion.expiringTime}
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
        playAgainGame={gameBySlug || gameById}
        onClickPlayAgain={onClickPlayAgain}
      />
    </ModalSkin>
  );
}
