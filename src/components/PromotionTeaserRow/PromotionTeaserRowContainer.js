// @flow
import { connect } from "react-redux";
import { isPageFetchedSelector, fetchPageBySlug, getField } from "Models/cms";
import { PromotionTeaserRow } from "./PromotionTeaserRow";

const promotionDatesField = "dates";
const promotionTitleBadge = "title";

export const PromotionTeaserRowContainer = connect(
  (state, { slug }: { slug: string }) => ({
    isFetched: isPageFetchedSelector(slug)(state),
    dates: getField({ slug, field: promotionDatesField })(state),
    title: getField({ slug, field: promotionTitleBadge })(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
)(PromotionTeaserRow);
