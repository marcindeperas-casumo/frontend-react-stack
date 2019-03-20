// @flow
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  initFetchAllLiveGames,
  getGroupedLiveGames,
  getLobbyNames,
  liveCasinoSlugs,
} from "Models/liveCasino";
import { fetchPageBySlug, isPageFetchedSelector } from "Models/cms";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";

export default connect(
  createStructuredSelector({
    groupedLiveGames: getGroupedLiveGames,
    translations: getLobbyNames,
    areTranslationsFetched: isPageFetchedSelector(liveCasinoSlugs.TRANSLATIONS),
  }),
  {
    initFetchAllLiveGames,
    fetchTranslations: () => fetchPageBySlug(liveCasinoSlugs.TRANSLATIONS),
  }
)(LiveCasinoDetailPage);
