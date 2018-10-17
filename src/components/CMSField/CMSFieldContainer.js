// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import {
  fetchPageBySlug,
  fieldSelectorFactory,
  isPageLoadedFactory,
} from "Reducers/cms";
import CMSField from "./CMSField";
import type { Props } from "./CMSField";

type PublicProps = {
  slug: string,
  field: string,
};

const connector: Connector<PublicProps, Props> = connect(
  (state, { slug, field }) => ({
    text: fieldSelectorFactory({ slug, field })(state),
    isFetched: isPageLoadedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
);

export default connector(CMSField);
