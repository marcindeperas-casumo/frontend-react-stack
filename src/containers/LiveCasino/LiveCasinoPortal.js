import React from "react";
import ReactDOM from "react-dom";
import { getHostElement } from "../../utils";
import LiveCasinoContainer from "./LiveCasinoContainer";

const LIVE_CASINO_HOST_ID = "react-host-live-casino";

export default class LiveCasinoPortal extends React.Component {
  constructor(props) {
    super(props);
    this.liveCasinoPortalRoot = getHostElement(LIVE_CASINO_HOST_ID);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    if (this.liveCasinoPortalRoot.tagName.toUpperCase() !== "BODY") {
      while (this.liveCasinoPortalRoot.hasChildNodes()) {
        this.liveCasinoPortalRoot.removeChild(
          this.liveCasinoPortalRoot.lastChild
        );
      }
    }

    this.liveCasinoPortalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.liveCasinoPortalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(<LiveCasinoContainer />, this.el);
  }
}
