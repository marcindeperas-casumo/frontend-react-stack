// @flow

import React from "react";
import { connect } from "react-redux";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
import {
  adventureContentSelector,
  adventurerSelector,
  CMS_CONTENT_SLUG,
  initAdventurerSaga,
  isAdventurerFetchedSelector,
} from "Models/adventure";
import {
  subscribeToAdventureUpdates,
  unsubscribeToAdventureUpdates,
} from "Models/cometd";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import AdventureCard from "Components/AdventureCard/AdventureCard";

const AdventureCardConnected = connect(
  state => ({
    adventurer: adventurerSelector(state),
    playerId: playerIdSelector(state),
    sessionId: sessionIdSelector(state),
    content: adventureContentSelector(state),
    isContentFetched: isPageFetchedSelector(CMS_CONTENT_SLUG)(state),
    isAdventurerFetched: isAdventurerFetchedSelector(state),
  }),
  dispatch => ({
    fetchAdventurer: () => dispatch(initAdventurerSaga()),
    fetchContent: () => dispatch(fetchPageBySlug(CMS_CONTENT_SLUG)),
    subscribeToUpdates: (playerId, sessionId) =>
      dispatch(subscribeToAdventureUpdates(playerId, sessionId)),
    unsubscribeFromUpdates: playerId =>
      dispatch(unsubscribeToAdventureUpdates(playerId)),
  })
)(AdventureCard);

const AdventureCardContainer = () => <AdventureCardConnected />;

export default AdventureCardContainer;
