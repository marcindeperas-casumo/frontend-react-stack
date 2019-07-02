// @flow
import React from "react";
import { connect } from "react-redux";
import { isPageFetchedSelector, fetchPageBySlug, getField } from "Models/cms";
import PromotionTeaserRow from "./PromotionTeaserRow";

type Props = {
  /** The slug of the page in the CMS which has the promotion info */
  slug: string,
};

const promotionDatesField = "dates";
const promotionTitleBadge = "title";

const PromotionTeaserRowConnected = connect(
  (state, { slug }) => ({
    isFetched: isPageFetchedSelector(slug)(state),
    dates: getField({ slug, field: promotionDatesField })(state),
    title: getField({ slug, field: promotionTitleBadge })(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(PromotionTeaserRow);

const PromotionTeaserRowContainer = (props: Props) => (
  <PromotionTeaserRowConnected {...props} />
);

export default PromotionTeaserRowContainer;
