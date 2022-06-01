import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
import {
  adventureContentSelector,
  adventurerSelector,
  CMS_CONTENT_SLUG,
  initAdventurerSaga,
  isAdventurerFetchedSelector,
} from "Models/adventure";
import type { Adventurer } from "Models/adventure";
import {
  subscribeToAdventureUpdates,
  unsubscribeFromAdventureUpdates,
} from "Models/cometd";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import { AdventureCard } from "Components/AdventureCard/AdventureCard";
import { gamificationFeaturesApi } from "Models/gamificationFeatures";

export default function AdventureCardContainer() {
  const playerId = useSelector(playerIdSelector);
  const sessionId = useSelector(sessionIdSelector);
  const adventurer = useSelector(adventurerSelector);
  const content = useSelector(adventureContentSelector);
  const isContentFetched = useSelector(isPageFetchedSelector(CMS_CONTENT_SLUG));
  const isAdventurerFetched = useSelector(isAdventurerFetchedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const subscribeToAdventure = () =>
      dispatch(subscribeToAdventureUpdates(playerId, sessionId));
    const unsubscribeToAdventure = () =>
      dispatch(unsubscribeFromAdventureUpdates(playerId));

    if (!isContentFetched) {
      dispatch(fetchPageBySlug(CMS_CONTENT_SLUG));
    }

    if (!isAdventurerFetched) {
      dispatch(initAdventurerSaga());
    }

    subscribeToAdventure();

    return () => {
      unsubscribeToAdventure();
    };
  }, [dispatch, isAdventurerFetched, isContentFetched, playerId, sessionId]);

  const {
    data: gamificationFeatures,
    isFetching: gamificationFeaturesLoading,
  } = gamificationFeaturesApi.useGetGamificationFeaturesQuery();

  const canPlayerSeeAdventure = gamificationFeatures?.adventure;

  if (
    !isContentFetched ||
    !isAdventurerFetched ||
    gamificationFeaturesLoading
  ) {
    return null;
  }

  return (
    <AdventureCard
      adventurer={adventurer as Adventurer}
      content={content}
      showProgress={canPlayerSeeAdventure}
    />
  );
}
