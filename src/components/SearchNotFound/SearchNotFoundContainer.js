// @flow
import React from "react";
import { connect } from "react-redux";
import { isPageFetched, getField } from "Models/cms";
import SearchNotFound from "./SearchNotFound";
type Props = {};
const notFoundCMSPageSlug = "page";

const SearchNotFoundConnected = connect(state => ({
  //   --- uncomment the following line once CMS is ready ---
  //   isFetched: isPageFetched(notFoundCMSPageSlug)(state),
  isFetched: true,
  //   --- uncomment the following line once CMS is ready ---
  //   image: getField({
  //     notFoundCMSPageSlug,
  //     field: "image",
  //   })(state),
  image:
    "https://cms.casumo.com/wp-content/uploads/2019/01/search_not_found.png",
  //   --- uncomment the following line once CMS is ready ---
  //   title: getField({
  //     notFoundCMSPageSlug,
  //     field: "title",
  //   })(state),
  title: "No results found",
  //   --- uncomment the following line once CMS is ready ---
  //   content: getField({
  //     notFoundCMSPageSlug,
  //     field: "content",
  //   })(state),
  content: "Find another game or continue playing <br /> your last played",
}))(SearchNotFound);

const SearchNotFoundContainer = (props: Props) => (
  <SearchNotFoundConnected {...props} />
);

export default SearchNotFoundContainer;
