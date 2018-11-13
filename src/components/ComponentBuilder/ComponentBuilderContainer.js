// @flow
import React from "react";
import { connect } from "react-redux";
import ComponentBuilderCMS from "Components/ComponentBuilder/ComponentBuilderCMS";
import {
  fieldSelectorFactory,
  isPageFetchedFactory,
  fetchPageBySlug,
} from "Reducers/cms";

// This is the field that holds the component definitions under a CMS page
const field = "content_builder";

type Props = {
  /** The slug of the CMS page containing the component definitions. */
  slug: string,
};

const ComponentBuilderConnected = connect(
  (state, { slug }) => ({
    componentDefinitions: fieldSelectorFactory({ slug, field })(state),
    shouldFetch: !isPageFetchedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    fetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(ComponentBuilderCMS);

const ComponentBuilderContainer = ({ slug }: Props) => {
  return <ComponentBuilderConnected slug={slug} />;
};

export default ComponentBuilderContainer;
