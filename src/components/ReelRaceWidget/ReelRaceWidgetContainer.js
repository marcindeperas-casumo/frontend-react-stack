// @flow
import { connect } from "react-redux";
import {
  reelRaceStartedSelector,
  reelRaceScheduledSelector,
} from "Models/reelRaceWidget";
import { gameSelector } from "Models/schema";
import { tournamentChannelsSelector, playerIdSelector } from "Models/handshake";
import { playingSelector } from "Models/playing";
import {
  fetchPageBySlug as fetchTranslations,
  isPageFetchedSelector,
} from "Models/cms";
import {
  slug,
  reelRacesTranslationsSelector,
  isReelRacesFetched,
  initReelRacesSaga,
} from "Models/reelRaces";
import {
  subscribeReelRaceUpdates,
  unsubscribeReelRaceUpdates,
} from "Models/cometd";
import { ReelRaceWidget } from "./ReelRaceWidget";

export default connect(
  state => {
    const reelRaceStarted = reelRaceStartedSelector(state);
    const reelRaceScheduled = reelRaceScheduledSelector(state);

    if (!reelRaceStarted && !reelRaceScheduled) {
      return {};
    }

    const { gameSlug } = reelRaceStarted || reelRaceScheduled;

    return {
      reelRaceStarted,
      reelRaceScheduled,
      gameSlug,
      scheduledGame: gameSelector(gameSlug)(state),
      playing: playingSelector(state),
      isReelRacesFetched: isReelRacesFetched(state),
      areTranslationsFetched: isPageFetchedSelector(slug)(state),
      t: {
        ...reelRacesTranslationsSelector(state),
      },
      tournamentChannels: tournamentChannelsSelector(state),
      playerId: playerIdSelector(state),
    };
  },
  dispatch => ({
    fetchReelRaces: () => dispatch(initReelRacesSaga()),
    fetchTranslations: () => dispatch(fetchTranslations(slug)),
    subscribeReelRacesUpdates: (tournamentChannels, playerId) => {
      tournamentChannels.map(channelPrefix => {
        return dispatch(subscribeReelRaceUpdates(channelPrefix, playerId));
      });
    },
    unsubscribeReelRacesUpdates: (tournamentChannels, playerId) => {
      tournamentChannels &&
        tournamentChannels.map(channelPrefix => {
          return dispatch(unsubscribeReelRaceUpdates(channelPrefix, playerId));
        });
    },
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { tournamentChannels, playerId } = stateProps;

    return {
      ...stateProps,
      ...dispatchProps,
      fetchTranslations: () => dispatchProps.fetchTranslations(slug),
      subscribeReelRacesUpdates: () => {
        return dispatchProps.subscribeReelRacesUpdates(
          tournamentChannels,
          playerId
        );
      },
      unsubscribeReelRacesUpdates: () =>
        dispatchProps.unsubscribeReelRacesUpdates(tournamentChannels, playerId),
    };
  }
)(ReelRaceWidget);
