// @flow
import * as React from "react";
import gql from "graphql-tag";
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

const GAME_FRAGMENT = gql`
  fragment AfterLimitsReached_Game on Game {
    __typename
    id
    slug
    backgroundImage
    logo
    name
  }
`;

export const GAME_BY_SLUG_QUERY = gql`
  query PlayAgainGameBySlugQuery($slug: String!) {
    gamesBySlugs(slugs: [$slug]) {
      ...AfterLimitsReached_Game
    }
  }
  ${GAME_FRAGMENT}
`;

export const LATEST_PLAYED_QUERY = gql`
  query PlayAgainLatestPlayedQuery {
    gamesList(listId: "latestPlayedGames") {
      games(numberOfGames: 1) {
        ...AfterLimitsReached_Game
      }
    }
  }
  ${GAME_FRAGMENT}
`;

type PlayAgainGameBySlugQueryResult = {
  gamesBySlugs: Array<A.GameRow_Game>,
};

type PlayAgainGameBySlugQueryVars = {
  slug: string,
};

type PlayAgainLatestPlayedQueryResult = {
  gamesList: any,
};

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
    PlayAgainGameBySlugQueryResult,
    PlayAgainGameBySlugQueryVars
  >(GAME_BY_SLUG_QUERY, {
    skip: !isPlayRouteActive,
    variables: { slug: gameSlug || "" },
  });
  const gameBySlug: ?A.GameRow_Game = path(["data", "gamesBySlugs", 0])(
    gameQueryProps
  );
  const latestPlayedQueryProps = useQuery<PlayAgainLatestPlayedQueryResult, _>(
    LATEST_PLAYED_QUERY,
    {
      skip: isPlayRouteActive,
    }
  );
  const gameById: ?A.GameRow_Game = path(["data", "gamesList", "games", 0])(
    latestPlayedQueryProps
  );

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
    navigateToKO(ROUTE_IDS.PLAY, { slug: gameById?.slug || "" });
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
