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
  slug: string,
};

const promotionImageField = "image";
const promotionBadgeField = "campaign_badge";

const connector: Connector<PublicProps, Props> = connect(
  (state, { slug }) => ({
    isFetched: isPageLoadedFactory(slug)(state),
    image: fieldSelectorFactory({
      slug,
      field: promotionImageField,
    })(state),
    badge: fieldSelectorFactory({
      slug,
      field: promotionBadgeField,
    })(state),
  }),
  (dispatch, { promotionSlug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(promotionSlug)),
  })
);

export default connector(PromotionCard);
