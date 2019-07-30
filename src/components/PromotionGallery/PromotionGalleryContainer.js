// @flow
import { connect } from "react-redux";
import { take } from "ramda";
import { fetchPageBySlug, getField, getFieldIfNotSuspicious } from "Models/cms";
import { marketSelector } from "Models/handshake";
import PromotionCardGallery from "./PromotionGallery";

const field = "promotions";
const defaultValue = [];
const getSlug = slug => `${slug}.*`;

export default connect(
  (state, { slug }) => ({
    promotionsSlugs: take(
      4,
      getFieldIfNotSuspicious({
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
