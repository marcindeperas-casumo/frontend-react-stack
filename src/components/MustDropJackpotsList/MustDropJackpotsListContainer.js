// @flow
import React from "react";
import { connect } from "react-redux";
import {
  mustDropJackpotsIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";
import MustDropJackpotsList from "./MustDropJackpotsList";

type Props = {
  id: string,
  title: string,
};

const MustDropJackpotListConnected = connect(state => ({
  ids: mustDropJackpotsIdsSelector(state),
  title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
}))(MustDropJackpotsList);

const MustDropJackpotListContainer = ({ id, title }: Props) => {
  return <MustDropJackpotListConnected id={id} title={title} />;
};

export default MustDropJackpotListContainer;
