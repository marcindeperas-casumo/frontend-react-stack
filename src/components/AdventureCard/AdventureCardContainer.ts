// @flow

import { connect } from "react-redux";
import { omit } from "ramda";
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
  unsubscribeFromAdventureUpdates,
} from "Models/cometd";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import AdventureCard from "Components/AdventureCard/AdventureCard";

export default connect(
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
    dispatchSubscribeToAdventureUpdates: (playerId, sessionId) =>
      dispatch(subscribeToAdventureUpdates(playerId, sessionId)),
    dispatchUnsubscribeFromAdventureUpdates: playerId =>
      dispatch(unsubscribeFromAdventureUpdates(playerId)),
  }),
  (stateProps, dispatchProps) => {
    const { playerId, sessionId } = stateProps;
    const {
      dispatchSubscribeToAdventureUpdates,
      dispatchUnsubscribeFromAdventureUpdates,
      fetchAdventurer,
      fetchContent,
    } = dispatchProps;

    return {
      ...omit(["playerId", "sessionId"], stateProps),
      fetchAdventurer,
      fetchContent,
      subscribeToAdventureUpdates: () =>
        dispatchSubscribeToAdventureUpdates(playerId, sessionId),
      unsubscribeFromAdventureUpdates: () =>
        dispatchUnsubscribeFromAdventureUpdates(playerId),
    };
  }
)(AdventureCard);
