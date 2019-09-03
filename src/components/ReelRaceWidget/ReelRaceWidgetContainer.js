// @flow
import { connect } from "react-redux";
import { reelRaceWidgetSelector } from "Models/reelRaceWidget";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
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
import { ReelRaceWidget } from "./ReelRaceWidget";

export default connect(
  state => {
    const reelRace = reelRaceWidgetSelector(state);

    if (!reelRace) {
      return {};
    }

    return {
      ...reelRace,
      game: gameSelector(reelRace.gameSlug)(state),
      playing: playingSelector(state),
      isReelRacesFetched: isReelRacesFetched(state),
      areTranslationsFetched: isPageFetchedSelector(slug)(state),
      t: {
        ...reelRacesTranslationsSelector(state),
      },
    };
  },
  {
    initReelRacesSaga,
    fetchTranslations,
    launchGame,
  },
  (stateProps, dispatchProps, ownProps) => {
    return {
      ...stateProps,
      ...dispatchProps,
      fetchTranslations: () => dispatchProps.fetchTranslations(slug),
      launchGame: () => dispatchProps.launchGame(stateProps.gameSlug),
    };
  }
)(ReelRaceWidget);
