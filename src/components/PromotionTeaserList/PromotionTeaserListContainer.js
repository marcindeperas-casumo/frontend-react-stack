// @flow
import React from "react";
import { connect } from "react-redux";
import { fetchPageBySlug, getField } from "Models/cms";
import PromotionTeaserList from "./PromotionTeaserList";

type Props = {
  /** The slug of the page in the CMS which has all the promotions available */
  slug: string,
};

const promotionsField = "promotions";
const defaultValue = [];
const getSlug = slug => `${slug}.*`;

const PromotionTeaserListConnected = connect(
  (state, { slug }) => ({
    promotionsSlugs: getField({
      slug,
      field: promotionsField,
      defaultValue,
    })(state),
  }),
  (dispatch, { slug }) => ({
    fetchCampaign: () => dispatch(fetchPageBySlug(getSlug(slug))),
    fetchPromotions: () => dispatch(fetchPageBySlug("promotions.*")),
  })
)(PromotionTeaserList);

const PromotionTeaserListContainer = (props: Props) => (
  <PromotionTeaserListConnected {...props} />
);

export default PromotionTeaserListContainer;
