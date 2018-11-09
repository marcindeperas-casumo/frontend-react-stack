// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import PromotionCard from "./PromotionCard";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Reducers/cms";
import type { Props } from "./PromotionCard";

type PublicProps = {
  promotionSlug: string,
};

const promotionImageField = "image";
const promotionBadgeField = "campaign_badge";

const connector: Connector<PublicProps, Props> = connect(
  (state, { promotionSlug }) => ({
    isFetched: isPageLoadedFactory(promotionSlug)(state),
    promotionImage: fieldSelectorFactory({
      slug: promotionSlug,
      field: promotionImageField,
    })(state),
    promotionBadge: fieldSelectorFactory({
      slug: promotionSlug,
      field: promotionBadgeField,
    })(state),
  }),
  (dispatch, { promotionSlug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(promotionSlug)),
  })
);

export default connector(PromotionCard);
