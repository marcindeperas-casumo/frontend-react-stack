// @flow
import { connect } from "react-redux";
import { getField } from "Models/cms";
import { PromotionTeaserRow } from "./PromotionTeaserRow";

const promotionDatesField = "dates";
const promotionTitleBadge = "title";

export const PromotionTeaserRowContainer = connect(
  (state, { slug }: { slug: string }) => ({
    dates: getField({ slug, field: promotionDatesField })(state),
    title: getField({ slug, field: promotionTitleBadge })(state),
  })
)(PromotionTeaserRow);
