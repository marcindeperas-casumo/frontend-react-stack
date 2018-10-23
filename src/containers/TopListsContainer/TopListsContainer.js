// @flow
import { connect } from "react-redux";
import TopLists from "Components/TopLists";
import { visibleTopListIds } from "Reducers/schema/selector";
import { market as marketSelector } from "Reducers/handshake/selectors";
import type { Connector } from "react-redux";

const connector: Connector = connect(state => ({
  listIds: visibleTopListIds(state),
  market: marketSelector(state),
}));

export default connector(TopLists);
