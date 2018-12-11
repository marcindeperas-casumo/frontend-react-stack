// @flow
import React from "react";
import { connect } from "react-redux";
import { isPageFetched, getField } from "Models/cms";
import PromotionGalleryCard from "./PromotionGalleryCard";
import type { Props } from "./PromotionGalleryCard";

const PromotionGalleryCardConnected = connect((state, { slug }) => ({
  isFetched: isPageFetched(slug)(state),
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
}))(PromotionGalleryCard);

const PromotionGalleryCardContainer = (props: Props) => (
  <PromotionGalleryCardConnected {...props} />
);

export default PromotionGalleryCardContainer;
