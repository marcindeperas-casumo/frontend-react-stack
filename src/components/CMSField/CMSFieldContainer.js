// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CMSField from "Components/CMSField/CMSField";
import type { Props } from "Components/CMSField/CMSField";
import {
  fetchPageBySlug,
  fieldSelectorFactory,
  isPageLoadedFactory,
} from "Models/cms";

type PublicProps = {
  slug: string,
  field: string,
};

const CMSFieldContainer: Connector<PublicProps, Props> = connect(
  (state, { slug, field }) => ({
    text: fieldSelectorFactory({ slug, field })(state),
    isFetched: isPageLoadedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
);

export default CMSFieldContainer(CMSField);
