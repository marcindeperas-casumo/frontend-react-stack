// @flow
import React from "react";
import { connect } from "react-redux";
import { take } from "ramda";
import { fetchPageBySlug, getField } from "Models/cms";
import { market as marketSelector } from "Models/handshake";
import PromotionCardGallery from "./PromotionGallery";

type Props = {
  /** The slug of the page in the CMS which has all the promotions available */
  slug: string,
};

const field = "promotions";
const defaultValue = [];
const getSlug = slug => `${slug}.*`;

const PromotionCardGalleryConnected = connect(
  (state, { slug }) => ({
    promotionsSlugs: take(
      4,
      getField({
        slug,
        field,
        defaultValue,
      })(state)
    ),
    seeMore: getField({
      slug: `built-pages.top-lists-${marketSelector(state)}`,
      field: "more_link",
    })(state),
  }),
  (dispatch, { slug }) => ({
    fetchCampaign: () => dispatch(fetchPageBySlug(getSlug(slug))),
    fetchPromotions: () => dispatch(fetchPageBySlug("promotions.*")),
  })
)(PromotionCardGallery);

const PromotionCardGalleryContainer = (props: Props) => (
  <PromotionCardGalleryConnected {...props} />
);

export default PromotionCardGalleryContainer;
