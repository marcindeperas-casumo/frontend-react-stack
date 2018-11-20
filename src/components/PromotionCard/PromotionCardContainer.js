// @flow
import React from "react";
import { connect } from "react-redux";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Models/cms";
import PromotionCard from "./PromotionCard";
import type { Props } from "./PromotionCard";

const promotionImageField = "image";
const promotionBadgeField = "campaign_badge";

const PromotionCardConnected = connect(
  (state, { slug }) => ({
    isFetched: isPageLoadedFactory(slug)(state),
    image: fieldSelectorFactory({
      slug,
      field: promotionImageField,
    })(state),
    badge: fieldSelectorFactory({
      slug,
      field: promotionBadgeField,
    })(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(PromotionCard);

const PromotionCardContainer = (props: Props) => (
  <PromotionCardConnected {...props} />
);

export default PromotionCardContainer;
