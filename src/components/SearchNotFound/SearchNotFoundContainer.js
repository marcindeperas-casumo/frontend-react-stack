// @flow
import React from "react";
import { connect } from "react-redux";
import { getField, fetchPageBySlug } from "Models/cms";
import { cmsPageSlug, searchNotFoundContent } from "Models/gameSearch";
import SearchNotFound from "./SearchNotFound";

type Props = {};

const SearchNotFoundConnected = connect(
  state => ({
    image: getField({
      slug: cmsPageSlug,
      field: "no_results_image",
    })(state),
    title: getField({
      slug: cmsPageSlug,
      field: "no_results_title",
    })(state),
    content: searchNotFoundContent(state),
  }),
  dispatch => ({
    startFetch: () => dispatch(fetchPageBySlug(cmsPageSlug)),
  })
)(SearchNotFound);

const SearchNotFoundContainer = (props: Props) => (
  <SearchNotFoundConnected {...props} />
);

export default SearchNotFoundContainer;
