import { useQuery } from "@apollo/client";
import { useSelector, connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { sessionIdSelector, countrySelector } from "Models/handshake";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { subscribeToItemExpiredEvent } from "Components/PlayerValuableList/utils";
import { navigateToSportsHash } from "Features/sports/utils";
import { navigateById } from "Services/NavigationService";
import { usePusher, useTranslations, useLanguage } from "Utils/hooks";
import { PUSHER_CONSTANTS, ROUTE_IDS } from "Src/constants";
import {
  subscribeToPusherEvent,
  unsubscribeFromPusherChannel,
} from "Services/PusherPubSubService";
import { XMAS_CMS_PAGE } from "Components/Pusher/variants/CustomCampaign/CustomCampaign";
import { routeTranslator } from "Utils/routerUtils";
import { useGameInfo } from "Utils/hooks/useGameInfo";
import { CURATED_TYPE } from "./CuratedCard.utils";
import { CuratedCard } from "./CuratedCard";
import { CuratedCardSkeleton } from "./CuratedCardSkeleton";
import { CuratedCardQuery } from "./CuratedCard.graphql";

type Props = {
  className?: string;
  slug: string;
  sessionId: string;
};

const CC_PUSHER_DATA_TYPE = "curated_component" as const;
const CC_PUSHER_DATA_SESSION_STORAGE_KEY = "pusher_curated_component" as const;

type TCCPusherPayload = {
  Data: {
    Component: typeof CC_PUSHER_DATA_TYPE;
    OverrideCommunicationStatus: string;
    "Site Block": string;
    event_name: string;
    game: string;
    trigger: string;
  };
  Date: string;
  DisplayType: string;
  Event: string;
  Title: string;
};

type TTranslations = {
  [gameName: string]: {
    url: string;
    sizes: {
      thumbnail: string;
    };
  };
};

/* eslint-disable sonarjs/cognitive-complexity */
export const CuratedCardContainerBase = ({
  className,
  slug,
  sessionId,
}: Props) => {
  const variables = { slug };
  const { data: slugGqlData, loading, refetch } = useQuery<
    A.CuratedCardQuery,
    A.CuratedCardQueryVariables
  >(CuratedCardQuery, {
    variables,
  });
  const playerCountry = useSelector(countrySelector);

  const language = useLanguage();
  const translateRoute = routeTranslator(language);
  const { pathname } = useLocation();

  const { pusher, fastTrackPlayerId } = usePusher(sessionId);
  const [pusherData, setPusherData] = useState<TCCPusherPayload>(null);
  const t = useTranslations<TTranslations>(XMAS_CMS_PAGE);

  const { gameInfo, loading: gameLoading } = useGameInfo(
    pusherData?.Data?.game
  );

  const onPusherEvent = (_data: TCCPusherPayload) => {
    if (_data?.Data?.Component === CC_PUSHER_DATA_TYPE) {
      setPusherData(_data);
      sessionStorage.setItem(
        CC_PUSHER_DATA_SESSION_STORAGE_KEY,
        JSON.stringify(_data)
      );
    }
  };

  useEffect(() => {
    const channelName = `${PUSHER_CONSTANTS.pusherChannelnamePrefix}${fastTrackPlayerId}`;
    if (fastTrackPlayerId && Object.keys(pusher).length) {
      subscribeToPusherEvent(
        pusher,
        channelName,
        PUSHER_CONSTANTS.pusherEvents,
        onPusherEvent
      );
    }

    return () => {
      unsubscribeFromPusherChannel(pusher, channelName);
    };
  }, [pusher, fastTrackPlayerId]);

  useEffect(() => {
    const prevPusherPayload = sessionStorage.getItem(
      CC_PUSHER_DATA_SESSION_STORAGE_KEY
    );
    onPusherEvent(JSON.parse(prevPusherPayload));
  }, []);

  useEffect(() => {
    const handler = subscribeToItemExpiredEvent(({ success }) => {
      if (success) {
        refetch();
      }
    });

    return function cleanup() {
      handler.unsubscribe();
    };
  });

  if (playerCountry === "nl") {
    return null;
  }

  // Xmas 2021 logic below
  if (
    loading ||
    (!pusherData && !slugGqlData) ||
    (gameLoading && !slugGqlData) ||
    !t
  ) {
    return <CuratedCardSkeleton />;
  }

  const gameName = pusherData?.Data?.game;
  const gameBg = t[gameName] ? t[gameName].url : t.generic.url;

  const xmasData: A.CuratedCardQuery | any = {
    ...slugGqlData,
    curatedCard: {
      ...slugGqlData?.curatedCard,
      type: CURATED_TYPE.GAME,
      header: pusherData?.Title,
      game: {
        ...gameInfo?.game,
      },
      image: gameBg,
      launchGameText: pusherData?.Data?.game
        ? t?.curated_card_cta_text
        : slugGqlData?.curatedCard?.launchGameText,
      slug: gameName,
    },
  };

  const isLiveCasino = pathname.includes(translateRoute(ROUTE_IDS.LIVE_CASINO));

  if (pusherData && xmasData && t && !isLiveCasino) {
    return (
      <CuratedCard
        className={className}
        market={xmasData?.session?.market}
        curatedCard={xmasData?.curatedCard}
        navigateToSportsHash={navigateToSportsHash}
        navigateById={navigateById}
        onLaunchGame={() =>
          launchGame({ slug: xmasData?.curatedCard?.game?.slug || "" })
        }
      />
    );
  } else {
    return (
      <CuratedCard
        className={className}
        market={slugGqlData?.session?.market}
        curatedCard={slugGqlData?.curatedCard}
        navigateToSportsHash={navigateToSportsHash}
        navigateById={navigateById}
        onLaunchGame={() =>
          launchGame({ slug: slugGqlData?.curatedCard?.game?.slug || "" })
        }
      />
    );
  }
  // --- cut here
};

export const CuratedCardContainer = connect(state => ({
  sessionId: sessionIdSelector(state),
}))(CuratedCardContainerBase);

/* eslint-enable sonarjs/cognitive-complexity */
