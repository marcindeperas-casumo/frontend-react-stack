import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";
import { getHostElement } from "Utils/index";

export const MUST_DROP_JACKPOTS_HOST_ID = "react-host-must-drop-jackpots";

// note: I couldn't use flow as it is fighting with the DOM methods. When iss23837-refactor-top-lists it's
// gonna be out, this portal will be refactored using the Portal component. @7michele7
export class MustDropJackpotsPortal extends PureComponent {
  constructor(props) {
    super(props);
    this.otherComponentRoot = getHostElement(MUST_DROP_JACKPOTS_HOST_ID);
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
    const { isFetching, ids } = this.props;

    return ReactDOM.createPortal(
      isFetching ? (
        <div>I'm a cute skeleton</div>
      ) : (
        <MustDropJackpots ids={ids} />
      ),
      this.el
    );
  }
}

export default MustDropJackpotsPortal;
