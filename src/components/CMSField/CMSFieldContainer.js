// @flow
import { connect } from "react-redux";
import { CMSField } from "Components/CMSField/CMSField";
import { fetchPageBySlug, getField, isPageFetchedSelector } from "Models/cms";

export const CMSFieldContainer = connect(
  (state, { slug, field }) => ({
    text: getField({ slug, field })(state),
    isFetched: isPageFetchedSelector(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(CMSField);
