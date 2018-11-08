// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import PromotionCard from "./PromotionCard";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  slugSelectorFactory,
} from "Reducers/cms";
import type { Props } from "./PromotionCard";

type PublicProps = {
  promotionSlug: string,
};

const connector: Connector<PublicProps, Props> = connect(
  (state, { promotionSlug, parentSlug }) => ({
    isFetched: isPageLoadedFactory(promotionSlug)(state),
    promotionPage: slugSelectorFactory(promotionSlug)(state),
  }),
  (dispatch, { promotionSlug, parentSlug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(promotionSlug)),
  })
);

export default connector(PromotionCard);
