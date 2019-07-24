// @flow
import React from "react";
import { connect } from "react-redux";
import { fetchPageBySlug, getField } from "Models/cms";
import { isSuspiciousAccount } from "Models/handshake";
import PromotionCardTeaserList from "./PromotionCardTeaserList";

type Props = {
  /** The slug of the page in the CMS which has all the promotions available */
  slug: string,
};

const promotionsField = "promotions";
const defaultValue = [];
const getSlug = slug => `${slug}.*`;

const PromotionCardTeaserListConnected = connect(
  (state, { slug }) => ({
    promotionsSlugs:
      !isSuspiciousAccount(state) &&
      getField({
        slug,
        field: promotionsField,
        defaultValue,
      })(state),
  }),
  (dispatch, { slug }) => ({
    fetchCampaign: () => dispatch(fetchPageBySlug(getSlug(slug))),
    fetchPromotions: () => dispatch(fetchPageBySlug("promotions.*")),
  })
)(PromotionCardTeaserList);

const PromotionCardTeaserListContainer = (props: Props) => (
  <PromotionCardTeaserListConnected {...props} />
);

export default PromotionCardTeaserListContainer;
