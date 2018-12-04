// @flow
import React from "react";
import { connect } from "react-redux";
import PromotionCardList from "./PromotionCardList";
import { fetchPageBySlug, getField } from "Models/cms";

type Props = {
  /** The slug of the page in the CMS which has all the promotions available */
  slug: string,
};

const field = "promotions";
const defaultValue = [];
const getSlug = slug => `${slug}.*`;

const PromotionCardListConnected = connect(
  (state, { slug }) => ({
    promotionsSlugs: getField({
      slug,
      field,
      defaultValue,
    })(state),
  }),
  (dispatch, { slug }) => ({
    fetchCampaign: () => dispatch(fetchPageBySlug(getSlug(slug))),
    fetchPromotions: () => dispatch(fetchPageBySlug("promotions.*")),
  })
)(PromotionCardList);

const PromotionCardListContainer = (props: Props) => (
  <PromotionCardListConnected {...props} />
);

export default PromotionCardListContainer;
