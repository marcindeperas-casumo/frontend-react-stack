// @flow
import { connect } from "react-redux";
import {
  slug,
  reelRacesIdsSelector,
  reelRacesTranslationsSelector,
  initReelRacesSaga,
} from "Models/reelRaces";
import { fetchPageBySlug, isPageFetchedSelector, getField } from "Models/cms";
import { marketSelector } from "Models/handshake";
import { ReelRacesList } from "./ReelRacesList";

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
  }),
  {
    fetchReelRaces: initReelRacesSaga,
    fetchTranslations: () => fetchPageBySlug(slug),
  }
)(ReelRacesList);
