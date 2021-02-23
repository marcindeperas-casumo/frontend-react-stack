// @flow
import { connect } from "react-redux";
import { fetchPageBySlug, getFieldIfNotSuspicious } from "Models/cms";
import { PromotionTeaserList } from "./PromotionTeaserList";

const promotionsField = "promotions";
const promotionsFieldDefaultValue = [];
const getSlug = slug => `${slug}.*`;

export const PromotionTeaserListContainer = connect(
  (state, { slug }: { slug: string }) => ({
    promotionsSlugs: getFieldIfNotSuspicious({
      slug,
      field: promotionsField,
      defaultValue: promotionsFieldDefaultValue,
    })(state),
  }),
  (dispatch, { slug }) => ({
    fetchCampaign: () => dispatch(fetchPageBySlug(getSlug(slug))),
    fetchPromotions: () => dispatch(fetchPageBySlug("promotions.*")),
  })
)(PromotionTeaserList);
