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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
  (state, { slug }) => ({
    isFetched: isPageFetchedSelector(slug)(state),
    badge: getField({
      slug,
      field: promotionBadgeField,
    })(state),
    dates: getField({ slug, field: promotionDatesField })(state),
    title: getField({ slug, field: promotionTitleBadge })(state),
  }),
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(PromotionCardTeaser);

const PromotionCardTeaserContainer = (props: Props) => (
  // @ts-expect-error ts-migrate(2741) FIXME: Property 'link' is missing in type '{ slug: string... Remove this comment to see the full error message
  <PromotionCardTeaserConnected {...props} />
);

export default PromotionCardTeaserContainer;
