// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import PromotionCard from "./PromotionCard";
import { isPageLoadedFactory } from "Reducers/cms";
import type { Props } from "./PromotionCard";

type PublicProps = {
  slug: string,
};

const connector: Connector<PublicProps, Props> = connect((state, { slug }) => ({
  isFetched: isPageLoadedFactory(slug)(state),
}));

export default connector(PromotionCard);
