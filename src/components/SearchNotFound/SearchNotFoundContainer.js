// @flow
import React from "react";
import { connect } from "react-redux";
import { isPageFetched, getField, fetchPageBySlug } from "Models/cms";
import SearchNotFound from "./SearchNotFound";
type Props = {};
const searchCMSPageSlug = "mobile.games-search";

const SearchNotFoundConnected = connect(
  (state, { contentField }) => ({
    //   --- uncomment the following line once CMS is ready ---
    //   isFetched: isPageFetched(notFoundCMSPageSlug)(state),
    isFetched: true,
    image: getField({
      slug: searchCMSPageSlug,
      field: "no_results_image",
    })(state),
    title: getField({
      slug: searchCMSPageSlug,
      field: "no_results_title",
    })(state),
    content: getField({
      slug: searchCMSPageSlug,
      field: contentField,
    })(state),
  }),
  dispatch => ({
    startFetch: () => dispatch(fetchPageBySlug(searchCMSPageSlug)),
  })
)(SearchNotFound);

const SearchNotFoundContainer = (props: Props) => (
  <SearchNotFoundConnected {...props} />
);

export default SearchNotFoundContainer;
