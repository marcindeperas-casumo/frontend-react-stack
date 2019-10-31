// @flow
import { connect } from "react-redux";
import { omit } from "ramda";
import {
  slug,
  isReelRacesFetched,
  reelRacesIdsSelector,
  reelRacesTranslationsSelector,
  initReelRacesSaga,
} from "Models/reelRaces";
import { fetchPageBySlug, isPageFetchedSelector, getField } from "Models/cms";
import {
  marketSelector,
  tournamentChannelsSelector,
  playerIdSelector,
} from "Models/handshake";
import {
  subscribeReelRaceUpdates,
  unsubscribeReelRaceUpdates,
} from "Models/cometd";
import { ReelRacesList } from "./ReelRacesList";

const subscribeReelRacesUpdates = dispatch => {
  return (tournamentChannels, playerId) => {
    tournamentChannels.forEach(channelPrefix => {
      dispatch(subscribeReelRaceUpdates(channelPrefix, playerId));
    });
  };
};

const unsubscribeReelRacesUpdates = dispatch => {
  return (tournamentChannels, playerId) => {
    tournamentChannels.forEach(channelPrefix => {
      dispatch(unsubscribeReelRaceUpdates(channelPrefix, playerId));
    });
  };
};

export default connect(
  state => ({
    t: {
      ...reelRacesTranslationsSelector(state),
      more_link: getField({
        slug: `built-pages.top-lists-${marketSelector(state)}`,
        field: "more_link",
      })(state),
    },
    areTranslationsFetched: isPageFetchedSelector(slug)(state),
    reelRacesIds: reelRacesIdsSelector(state),
    isFetched: isReelRacesFetched(state),
    playerId: playerIdSelector(state),
    tournamentChannels: tournamentChannelsSelector(state),
  }),
  dispatch => ({
    fetchReelRaces: () => dispatch(initReelRacesSaga()),
    fetchTranslations: () => dispatch(fetchPageBySlug(slug)),
    subscribeReelRacesUpdates: subscribeReelRacesUpdates(dispatch),
    unsubscribeReelRacesUpdates: unsubscribeReelRacesUpdates(dispatch),
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { tournamentChannels, playerId } = stateProps;

    return {
      ...omit(["playerId"], stateProps),
      ...dispatchProps,
      ...ownProps,
      subscribeReelRacesUpdates: () =>
        dispatchProps.subscribeReelRacesUpdates(tournamentChannels, playerId),
      unsubscribeReelRacesUpdates: () =>
        dispatchProps.unsubscribeReelRacesUpdates(tournamentChannels, playerId),
    };
  }
)(ReelRacesList);
