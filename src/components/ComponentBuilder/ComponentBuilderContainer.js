// @flow
import React from "react";
import { connect } from "react-redux";
import { ComponentBuilderCMS } from "Components/ComponentBuilder/ComponentBuilderCMS";
import { getField, fetchPageBySlug } from "Models/cms";

// This is the field that holds the component definitions under a CMS page
const field = "content_builder";

type Props = {
  /** The slug of the CMS page containing the component definitions. */
  slug: string,
};

const ComponentBuilderConnected = connect(
  (state, { slug }) => ({
    componentDefinitions: getField({ slug, field })(state),
  }),
  (dispatch, { slug }) => ({
    fetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(ComponentBuilderCMS);

export const ComponentBuilderContainer = ({ slug }: Props) => {
  return <ComponentBuilderConnected slug={slug} />;
};
