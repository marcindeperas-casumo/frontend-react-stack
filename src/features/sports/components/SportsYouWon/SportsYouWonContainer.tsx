import { connect } from "react-redux";
import { fetchPageBySlug, getPage, isPageFetchedSelector } from "Models/cms";
import { SportsYouWonComponent } from "./SportsYouWonComponent";

const CMS_SLUG = "sports.sports-you-won-modal";

export default connect(
  (state, ownProps) => ({
    page: getPage(CMS_SLUG)(state),
    loaded: isPageFetchedSelector(CMS_SLUG)(state),
    ...ownProps,
  }),
  {
    fetchPage: () => fetchPageBySlug(CMS_SLUG),
  }
)(SportsYouWonComponent);
