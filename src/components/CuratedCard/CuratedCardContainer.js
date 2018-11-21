// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import type { Props } from "Components/CuratedCard/CuratedCard";
import {
  CURATED_SLUG,
  curatedSelector,
  isCuratedLoadedFactory,
} from "Models/curated";
import { fetchPageBySlug } from "Models/cms";
import { actions as gameActions } from "Models/games";
import { head } from "ramda";

export type PublicProps = {
  card: Array<string>,
};

export const getSlug = (slug: Array<string>) => `${CURATED_SLUG}.${head(slug)}`;

const connector: Connector<PublicProps, Props> = connect(
  (state, { card = [] }) => {
    const slug = getSlug(card);

    return {
      ...curatedSelector(slug)(state),
      isFetched: isCuratedLoadedFactory(slug)(state),
    };
  },
  (dispatch, { card }) => {
    const slug = getSlug(card);

    return {
      fetchCurated: () => dispatch(fetchPageBySlug(slug)),
      onLaunchGame: () => dispatch(gameActions.launchGame(slug)),
    };
  }
);

export default connector(CuratedCard);
