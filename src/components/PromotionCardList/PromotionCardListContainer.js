// @flow
import React from "react";
import { connect } from "react-redux";
import { fetchPageBySlug, getField, getFieldIfNotSuspicious } from "Models/cms";
import { marketSelector } from "Models/handshake";
import PromotionCardList from "./PromotionCardList";

type Props = {
  /** The slug of the page in the CMS which has all the promotions available */
  slug: string,
};

const field = "promotions";
const defaultValue = [];
const getSlug = slug => `${slug}.*`;

const PromotionCardListConnected = connect(
  (state, { slug }) => ({
    promotionsSlugs: getFieldIfNotSuspicious({
      slug,
      field,
      defaultValue,
    })(state),
    seeMore: getField({
      slug: `built-pages.top-lists-${marketSelector(state)}`,
      field: "more_link",
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
