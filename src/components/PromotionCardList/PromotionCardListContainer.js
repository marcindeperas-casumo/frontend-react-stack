// @flow
import React from "react";
import { connect } from "react-redux";
import PromotionCardList from "./PromotionCardList";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Models/cms";
import type { Props } from "./PromotionCardList";

const promotionsField = "promotions";
const defaultValue = [];

const PromotionCardListConnected = connect(
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
)(PromotionCardList);

const PromotionCardListContainer = (props: Props) => (
  <PromotionCardListConnected {...props} />
);

export default PromotionCardListContainer;
