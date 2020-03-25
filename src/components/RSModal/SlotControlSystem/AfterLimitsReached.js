// @flow
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { path } from "ramda";
import * as A from "Types/apollo";
import { ROUTE_IDS } from "Src/constants";
import { navigateToRerender } from "Utils";
import { useLocale, useCrossCodebaseNavigation } from "Utils/hooks";
import {
  useSessionsState,
  getSlugFromGamePage,
} from "Models/slotControlSystem";
import { type ModalContentComponent } from "Components/RSModal";
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
  const gameSlug = getSlugFromGamePage();
  const isPlayRouteActive = Boolean(gameSlug);
  const gameQueryProps = useQuery<
    A.PlayAgainGameBySlugQuery,
    A.PlayAgainGameBySlugQueryVariables
  >(PlayAgainGameBySlugQuery, {
    skip: !isPlayRouteActive,
    variables: { slug: gameSlug || "" },
  });
  const gameBySlug: ?A.AfterLimitsReached_Game = path([
    "data",
    "gamesBySlugs",
    0,
  ])(gameQueryProps);
  const latestPlayedQueryProps = useQuery<A.PlayAgainLatestPlayedQuery, _>(
    PlayAgainLatestPlayedQuery,
    {
      skip: isPlayRouteActive,
    }
  );
  const gameById: ?A.AfterLimitsReached_Game = path([
    "data",
    "gamesList",
    "games",
    0,
  ])(latestPlayedQueryProps);

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
        playAgainGame={gameBySlug || gameById}
        onClickPlayAgain={onClickPlayAgain}
      />
    </ModalSkin>
  );
}
