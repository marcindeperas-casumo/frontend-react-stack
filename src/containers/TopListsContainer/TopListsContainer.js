// @flow
import { connect } from "react-redux";
import TopLists from "Components/TopLists";
import { visibleTopListIds } from "Reducers/schema/selector";
import type { Connector } from "react-redux";

const connector: Connector = connect(state => ({
  listIds: visibleTopListIds(state),
}));

export default connector(TopLists);
