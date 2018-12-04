// @flow
import React from "react";
import { connect } from "react-redux";
import {
  mustDropJackpotsIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";
import MustDropJackpotsList from "./MustDropJackpotsList";
import { getField } from "Models/cms";
import { market as marketSelector } from "Models/handshake/selectors";

type Props = {
  id: string,
  title: string,
};

const MustDropJackpotListConnected = connect(state => ({
  ids: mustDropJackpotsIdsSelector(state),
  title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
  seeMore: getField({
    slug: `built-pages.top-lists-${marketSelector(state)}`,
    field: "more_link",
  })(state),
}))(MustDropJackpotsList);

const MustDropJackpotListContainer = ({ id, title }: Props) => {
  return <MustDropJackpotListConnected id={id} title={title} />;
};

export default MustDropJackpotListContainer;
