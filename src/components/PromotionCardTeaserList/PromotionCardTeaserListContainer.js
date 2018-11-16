// @flow
import React from "react";
import { connect } from "react-redux";
import PromotionCardTeaserList from "./PromotionCardTeaserList";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Models/cms";
import type { Props } from "./PromotionCardTeaserList";

const promotionsField = "promotions";
const defaultValue = [];

const PromotionCardTeaserListConnected = connect(
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
)(PromotionCardTeaserList);

const PromotionCardTeaserListContainer = (props: Props) => (
  <PromotionCardTeaserListConnected {...props} />
);

export default PromotionCardTeaserListContainer;
