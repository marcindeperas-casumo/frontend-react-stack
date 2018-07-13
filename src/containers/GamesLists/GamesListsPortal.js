import React from "react";
import ReactDOM from "react-dom";
import { getHostElement } from "../../utils";
import GamesListsContainer from "./GamesListsContainer";
import GamesListsSkeleton from "./GamesListsSkeleton";

const GAMES_LISTS_HOST_ID = "react-host-games-lists";

export default class GamesListsPortal extends React.Component {
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
  }

  render() {
    const { showSkeleton } = this.props;
    return ReactDOM.createPortal(
      <React.Fragment>
        {showSkeleton ? <GamesListsSkeleton /> : <GamesListsContainer />}
      </React.Fragment>,
      this.el
    );
  }
}
