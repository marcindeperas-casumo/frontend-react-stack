// @flow
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  initFetchAllLiveGames,
  getGroupedLiveGames,
  getLobbyNames,
  liveCasinoSlugs,
} from "Models/liveCasino";
import { fetchPageBySlug, isPageFetched } from "Models/cms";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";

export default connect(
  createStructuredSelector({
    groupedLiveGames: getGroupedLiveGames,
    translations: getLobbyNames,
    areTranslationsFetched: isPageFetched(liveCasinoSlugs.TRANSLATIONS),
  }),
  {
    initFetchAllLiveGames,
    fetchTranslations: () => fetchPageBySlug(liveCasinoSlugs.TRANSLATIONS),
  }
)(LiveCasinoDetailPage);
