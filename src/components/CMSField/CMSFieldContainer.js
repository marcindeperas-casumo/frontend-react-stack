// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CMSField from "Components/CMSField/CMSField";
import type { Props } from "Components/CMSField/CMSField";
import { fetchPageBySlug, getField, isPageFetched } from "Models/cms";

type PublicProps = {
  slug: string,
  field: string,
};

const CMSFieldContainer: Connector<PublicProps, Props> = connect(
  (state, { slug, field }) => ({
    text: getField({ slug, field })(state),
    isFetched: isPageFetched(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
);

export default CMSFieldContainer(CMSField);
