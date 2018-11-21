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

const PromotionCardConnected = connect(
  (state, { slug }) => ({
    isFetched: isPageLoadedFactory(slug)(state),
    image: fieldSelectorFactory({
      slug,
      field: "image",
    })(state),
    badge: fieldSelectorFactory({
      slug,
      field: "campaign_badge",
    })(state),
    dates: fieldSelectorFactory({
      slug,
      field: "dates",
    })(state),
    title: fieldSelectorFactory({
      slug,
      field: "title",
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
