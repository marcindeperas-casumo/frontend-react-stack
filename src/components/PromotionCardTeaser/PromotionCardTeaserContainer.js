// @flow
import React from "react";
import { connect } from "react-redux";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Models/cms";
import PromotionCardTeaser from "./PromotionCardTeaser";

type Props = {
  /** The slug of the page in the CMS which has the promotion info */
  slug: string,
};

const promotionBadgeField = "badge";
const promotionDatesField = "dates";
const promotionTitleBadge = "title";

const PromotionCardTeaserConnected = connect(
  (state, { slug }) => ({
    isFetched: isPageLoadedFactory(slug)(state),
    badge: fieldSelectorFactory({
      slug,
      field: promotionBadgeField,
    })(state),
    dates: fieldSelectorFactory({ slug, field: promotionDatesField })(state),
    title: fieldSelectorFactory({ slug, field: promotionTitleBadge })(state),
  }),
  (dispatch, { promotionSlug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(promotionSlug)),
  })
)(PromotionCardTeaser);

const PromotionCardTeaserContainer = (props: Props) => (
  <PromotionCardTeaserConnected {...props} />
);

export default PromotionCardTeaserContainer;
