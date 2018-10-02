import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import GamesListsSkeleton from "Containers/GamesLists/GamesListsSkeleton";
import { connect } from "react-redux";
import { fetchStatusFactory } from "Reducers/fetch/selectors";
import { types } from "Reducers/games";
import { getHostElement } from "Utils/index";
import TopListsContainer from "Containers/TopListsContainer";
const GAMES_LISTS_HOST_ID = "react-host-games-lists";

class GamesListsPortal extends PureComponent {
  constructor(props) {
    super(props);
    this.otherComponentRoot = getHostElement(GAMES_LISTS_HOST_ID);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    if (this.otherComponentRoot.tagName.toUpperCase() !== "BODY") {
      while (this.otherComponentRoot.hasChildNodes()) {
        this.otherComponentRoot.removeChild(this.otherComponentRoot.lastChild);
      }
    }

    this.otherComponentRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.otherComponentRoot.removeChild(this.el);
    this.otherComponentRoot = null;
    this.el = null;
  }

  render() {
    const { isFetching } = this.props;
    return ReactDOM.createPortal(
      isFetching ? <GamesListsSkeleton /> : <TopListsContainer />,
      this.el
    );
  }
}

export default connect(fetchStatusFactory(types.FETCH_TOP_LISTS_START))(
  GamesListsPortal
);
