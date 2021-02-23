// @flow
import React from "react";
import { connect } from "react-redux";
import { isPageFetchedSelector, fetchPageBySlug, getField } from "Models/cms";
import PromotionCardTeaser from "./PromotionCardTeaser";

type Props = {
  /** The slug of the page in the CMS which has the promotion info */
  slug: string,
};

const promotionBadgeField = "badge";
const promotionDatesField = "dates";
const promotionTitleBadge = "title";

const PromotionCardTeaserConnected = connect(
  (state, { slug }) => ({
    isFetched: isPageFetchedSelector(slug)(state),
    badge: getField({
      slug,
      field: promotionBadgeField,
    })(state),
    dates: getField({ slug, field: promotionDatesField })(state),
    title: getField({ slug, field: promotionTitleBadge })(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(PromotionCardTeaser);

const PromotionCardTeaserContainer = (props: Props) => (
  <PromotionCardTeaserConnected {...props} />
);

export default PromotionCardTeaserContainer;
