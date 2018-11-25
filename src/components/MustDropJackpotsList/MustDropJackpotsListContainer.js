// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import {
  jackpotIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema/selector";
import { GAME_LIST_IDS } from "Src/constants";
import MustDropJackpotsList from "./MustDropJackpotsList";

const connector: Connector = connect(state => ({
  ids: jackpotIdsSelector(state),
  title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
}));

export default connector(MustDropJackpotsList);
