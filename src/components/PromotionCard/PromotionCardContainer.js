// @flow
import React from "react";
import { connect } from "react-redux";
import { isPageFetchedSelector, getField } from "Models/cms";
import PromotionCard from "./PromotionCard";
import type { Props } from "./PromotionCard";

const PromotionCardConnected = connect((state, { slug }) => ({
  isFetched: isPageFetchedSelector(slug)(state),
  image: getField({
    slug,
    field: "image",
  })(state),
  badge: getField({
    slug,
    field: "campaign_badge",
  })(state),
  dates: getField({
    slug,
    field: "dates",
  })(state),
  title: getField({
    slug,
    field: "title",
  })(state),
}))(PromotionCard);

const PromotionCardContainer = (props: Props) => (
  <PromotionCardConnected {...props} />
);

export default PromotionCardContainer;
