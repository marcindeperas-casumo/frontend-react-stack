// @flow
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";

export const MUST_DROP_JACKPOTS_HOST_ID = "react-host-must-drop-jackpots";

type Props = {
  isFetching: boolean,
  ids: Array<string>,
};

export class MustDropJackpotsPortal extends PureComponent<Props> {
  render() {
    const { isFetching, ids } = this.props;

    const mustDropJackpotsElement = document.getElementById(
      MUST_DROP_JACKPOTS_HOST_ID
    );

    if (!mustDropJackpotsElement) {
      return null;
    }

    return ReactDOM.createPortal(
      isFetching ? (
        <div>I'm a cute skeleton</div>
      ) : (
        <MustDropJackpots ids={ids} />
      ),
      mustDropJackpotsElement
    );
  }
}

export default MustDropJackpotsPortal;
