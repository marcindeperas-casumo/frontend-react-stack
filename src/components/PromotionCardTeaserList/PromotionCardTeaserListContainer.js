// @flow
import React from "react";
import { connect } from "react-redux";
import PromotionCardTeaserList from "./PromotionCardTeaserList";
import { isPageFetched, fetchPageBySlug, getField } from "Models/cms";

type Props = {
  /** The slug of the page in the CMS which has all the promotions available */
  slug: string,
};

const promotionsField = "promotions";
const defaultValue = [];

const PromotionCardTeaserListConnected = connect(
  (state, { slug }) => ({
    promotionsSlugs: getField({
      slug,
      field: promotionsField,
      defaultValue,
    })(state),
    isFetched: isPageFetched(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(PromotionCardTeaserList);

const PromotionCardTeaserListContainer = (props: Props) => (
  <PromotionCardTeaserListConnected {...props} />
);

export default PromotionCardTeaserListContainer;
