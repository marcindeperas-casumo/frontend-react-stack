import { connect } from "react-redux";
import { getField } from "Models/cms";
import { PromotionTeaserRow } from "./PromotionTeaserRow";

const promotionDatesField = "dates";
const promotionTitleBadge = "title";

export const PromotionTeaserRowContainer = connect(
  (state, { slug }: { slug: string }) => ({
    // @ts-expect-error: apply fix if you know the context
    dates: getField({ slug, field: promotionDatesField })(state),
    // @ts-expect-error: apply fix if you know the context
    title: getField({ slug, field: promotionTitleBadge })(state),
  })
)(PromotionTeaserRow);
