// @flow

import React from "react";
import { connect } from "react-redux";
import AdventureCard from "Components/AdventureCard/AdventureCard";
import { playerIdSelector, sessionIdSelector } from "Models/handshake";
import {
  initAdventurerSaga,
  adventurerProgressionSelector,
  adventurerDetailsSelector,
} from "Models/adventure";
import {
  subscribeToAdventureUpdates,
  unsubscribeToAdventureUpdates,
} from "Models/cometd";

const AdventureCardConnected = connect(
  state => ({
    adventurerDetails: adventurerDetailsSelector(state),
    adventurerProgression: adventurerProgressionSelector(state),
    playerId: playerIdSelector(state),
    sessionId: sessionIdSelector(state),
  }),
  dispatch => ({
    fetchAdventurer: () => dispatch(initAdventurerSaga()),
    subscribeToUpdates: (playerId, sessionId) =>
      dispatch(subscribeToAdventureUpdates(playerId, sessionId)),
    unsubscribeFromUpdates: playerId =>
      dispatch(unsubscribeToAdventureUpdates(playerId)),
  })
)(AdventureCard);

const AdventureCardContainer = () => <AdventureCardConnected />;

export default AdventureCardContainer;
