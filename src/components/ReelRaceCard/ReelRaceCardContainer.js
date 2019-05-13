// @flow
import { connect } from "react-redux";
import {
  reelRacesTranslationsSelector,
  reelRacesByIdSelector,
  optInForReelRace,
} from "Models/reelRaces";
import { launchGame } from "Models/games";
import { gameSelector } from "Models/schema";
import { playerIdSelector } from "Models/handshake";
import {
  subscribeReelRacesUpdates,
  unsubscribeReelRacesUpdates,
} from "Models/cometd";
import { ReelRaceCard } from "./ReelRaceCard";

export default connect(
  (state, { id }) => {
    const reelRace = reelRacesByIdSelector(id)(state);

    if (!reelRace) {
      return {};
    }

    return {
      ...reelRace,
      game: gameSelector(reelRace.gameSlug)(state),
      t: reelRacesTranslationsSelector(state),
      playerId: playerIdSelector(state),
    };
  },
  {
    optInForReelRace,
    launchGame,
    subscribeReelRacesUpdates,
    unsubscribeReelRacesUpdates,
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    optIn: () => dispatchProps.optInForReelRace(ownProps.id),
    launchGame: () => dispatchProps.launchGame(stateProps.gameSlug),
    subscribeReelRacesUpdates: () =>
      dispatchProps.subscribeReelRacesUpdates(ownProps.id, stateProps.playerId),
    unsubscribeReelRacesUpdates: () =>
      dispatchProps.unsubscribeReelRacesUpdates(
        ownProps.id,
        stateProps.playerId
      ),
  })
)(ReelRaceCard);
