// @flow
import React from "react";
import { connect } from "react-redux";
import { identity } from "ramda";
import TileListHorizontal from "Components/TileListHorizontal/TileListHorizontal";
import { types } from "./TileListHorizontal.constants";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
} from "Models/gameProviders";
import { gameProvidersListSelector } from "Models/categories";

type Props = {
  /** Type of list (e.g, game-providers) */
  type: string,
  title: string,
};

const getSelectorByType = type => {
  switch (type) {
    case types.GAME_PROVIDERS:
      return {
        isLoaded: areGameProvidersLoaded,
        list: gameProvidersListSelector,
        dispatcher: fetchGameProviders,
      };
    default:
      return {
        isLoaded: identity(true),
        list: identity({ items: [] }),
        dispatcher: identity({}),
      };
  }
};

const TileListHorizontalConnected = connect(
  (state, { title, type }) => {
    const { isLoaded, list } = getSelectorByType(type);

    return {
      isLoaded: isLoaded(state),
      title,
      items: list(state),
    };
  },
  (dispatch, { type }) => {
    const { dispatcher } = getSelectorByType(type);
    return {
      fetch: () => dispatch(dispatcher()),
    };
  }
)(TileListHorizontal);

const TileListHorizontalContainer = (props: Props) => (
  <TileListHorizontalConnected {...props} />
);

export default TileListHorizontalContainer;
