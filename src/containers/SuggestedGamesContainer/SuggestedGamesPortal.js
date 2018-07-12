import React from "react";
import ReactDOM from "react-dom";
import { getHostElement } from "../../utils";
import SuggestedGamesContainer from "./SuggestedGamesContainer";
import SuggestedGamesSkeleton from "./SuggestedGamesSkeleton";

export default class SuggestedGamesPortal extends React.Component {
  constructor(props) {
    super(props);
    this.otherComponentRoot = getHostElement("otherComponent");
    this.el = document.createElement("div");
  }

  componentWillMount() {
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
        {showSkeleton ? (
          <SuggestedGamesSkeleton />
        ) : (
          <SuggestedGamesContainer />
        )}
      </React.Fragment>,
      this.el
    );
  }
}
