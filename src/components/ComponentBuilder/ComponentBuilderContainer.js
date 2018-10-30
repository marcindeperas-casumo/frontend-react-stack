// @flow
import React from "react";
import { connect } from "react-redux";
import {
  fieldSelectorFactory,
  isPageFetchedFactory,
  fetchPageBySlug,
} from "Reducers/cms";
import ComponentBuilderCMS from "Components/ComponentBuilder/ComponentBuilderCMS";

// This is the field that holds the component definitions under a CMS page
const field = "content_builder";

const ComponentBuilderConnected = connect(
  (state, { slug }) => ({
    componentDefinitions: fieldSelectorFactory({ slug, field })(state),
    shouldFetch: !isPageFetchedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    fetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(ComponentBuilderCMS);

type Props = {
  /** The slug of the CMS page containing the component definitions. */
  slug: string,
};

const ComponentBuilderContainer = ({ slug }: Props) => (
  <ComponentBuilderConnected slug={slug} />
);

export default ComponentBuilderContainer;
