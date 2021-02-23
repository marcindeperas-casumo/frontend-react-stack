// @flow
import React from "react";
import { connect } from "react-redux";
import { fetchPageBySlug, getFieldIfNotSuspicious } from "Models/cms";
import PromotionCardTeaserList from "./PromotionCardTeaserList";

type Props = {
  /** The slug of the page in the CMS which has all the promotions available */
  slug: string,
};

const promotionsField = "promotions";
const defaultValue = [];
const getSlug = slug => `${slug}.*`;

const PromotionCardTeaserListConnected = connect(
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
  (state, { slug }) => ({
    promotionsSlugs: getFieldIfNotSuspicious({
      slug,
      field: promotionsField,
      defaultValue,
    })(state),
  }),
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'slug' does not exist on type '{}'.
  (dispatch, { slug }) => ({
    fetchCampaign: () => dispatch(fetchPageBySlug(getSlug(slug))),
    fetchPromotions: () => dispatch(fetchPageBySlug("promotions.*")),
  })
)(PromotionCardTeaserList);

const PromotionCardTeaserListContainer = (props: Props) => (
  // @ts-expect-error ts-migrate(2741) FIXME: Property 'backgroundColor' is missing in type '{ s... Remove this comment to see the full error message
  <PromotionCardTeaserListConnected {...props} />
);

export default PromotionCardTeaserListContainer;
