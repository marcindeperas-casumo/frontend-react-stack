// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import type { Props } from "Components/CuratedCard/CuratedCard";
import { curatedSelector, isCuratedLoadedFactory } from "Models/curated";
import { fetchPageBySlug } from "Models/cms";
import { actions as gameActions } from "Models/games";
import { head } from "ramda";

export const getSlug = (slug: Array<string>) => `curated.${head(slug)}`;

const connector: Connector<Props> = connect(
  (state, { card }) => {
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
