// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import PromotionCards from "./PromotionCards";
import {
  isPageLoadedFactory,
  fetchPageBySlug,
  fieldSelectorFactory,
} from "Reducers/cms";

import type { Props } from "./PromotionCards";

type PublicProps = {
  slug: string,
};

const promotionsField = "promotions";
const defaultValue = [];

const connector: Connector<PublicProps, Props> = connect(
  (state, { slug }) => ({
    promotionsSlugs: fieldSelectorFactory({
      slug,
      field: promotionsField,
      defaultValue,
    })(state),
    isFetched: isPageLoadedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    startFetch: () => dispatch(fetchPageBySlug(slug)),
  })
);

export default connector(PromotionCards);
