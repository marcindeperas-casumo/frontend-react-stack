// @flow
import React from "react";
import { connect } from "react-redux";
import PromotionCards from "./PromotionCards";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Models/cms";
import type { Props } from "./PromotionCards";

const promotionsField = "promotions";
const defaultValue = [];

const PromotionCardsConnected = connect(
  (state, { slug }) => ({
    promotionsSlugs: fieldSelectorFactory({
      slug,
      field: promotionsField,
      defaultValue,
    })(state),
    isFetched: isPageLoadedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(PromotionCards);

const PromotionCardsContainer = (props: Props) => (
  <PromotionCardsConnected {...props} />
);

export default PromotionCardsContainer;
