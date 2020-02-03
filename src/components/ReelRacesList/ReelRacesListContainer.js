// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

// Polling for updates is temporary.
// We are going to move to use subscriptions once the GraphQL server is ready for it
const pollIntervall = 3000;

export const ReelRacesListContainer = () => {
  const { data, loading } = useQuery(ReelRaceListQuery, { pollInterval });

  return (
    <ReelRacesList
      isFetched={!loading}
      areTranslationsFetched={!loading}
      reelRaces={data?.reelRaces}
      // same
      title={data?.title}
    />
  );
};

// const subscribeReelRacesUpdates = dispatch => {
//   return (tournamentChannels, playerId) => {
//     tournamentChannels.forEach(channelPrefix => {
//       dispatch(subscribeReelRaceUpdates(channelPrefix, playerId));
//     });
//   };
// };

// const unsubscribeReelRacesUpdates = dispatch => {
//   return (tournamentChannels, playerId) => {
//     tournamentChannels.forEach(channelPrefix => {
//       dispatch(unsubscribeReelRaceUpdates(channelPrefix, playerId));
//     });
//   };
// };

// export default connect(
//   state => ({
//     t: {
//       ...reelRacesTranslationsSelector(state),
//       more_link: getField({
//         slug: `built-pages.top-lists-${marketSelector(state)}`,
//         field: "more_link",
//       })(state),
//     },
//     areTranslationsFetched: isPageFetchedSelector(slug)(state),
//     reelRacesIds: reelRacesIdsSelector(state),
//     isFetched: isReelRacesFetched(state),
//     playerId: playerIdSelector(state),
//     tournamentChannels: tournamentChannelsSelector(state),
//   }),
//   dispatch => ({
//     fetchReelRaces: () => dispatch(initReelRacesSaga()),
//     fetchTranslations: () => dispatch(fetchPageBySlug(slug)),
//     subscribeReelRacesUpdates: subscribeReelRacesUpdates(dispatch),
//     unsubscribeReelRacesUpdates: unsubscribeReelRacesUpdates(dispatch),
//   }),
//   (stateProps, dispatchProps, ownProps) => {
//     const { tournamentChannels, playerId } = stateProps;

//     return {
//       ...omit(["playerId"], stateProps),
//       ...dispatchProps,
//       ...ownProps,
//       subscribeReelRacesUpdates: () =>
//         dispatchProps.subscribeReelRacesUpdates(tournamentChannels, playerId),
//       unsubscribeReelRacesUpdates: () =>
//         dispatchProps.unsubscribeReelRacesUpdates(tournamentChannels, playerId),
//     };
//   }
// )(ReelRacesList);
