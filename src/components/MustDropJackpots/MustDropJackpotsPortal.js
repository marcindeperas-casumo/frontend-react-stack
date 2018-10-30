// @flow
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

export const MUST_DROP_JACKPOTS_HOST_ID = "react-host-must-drop-jackpots";

type Props = {
  isFetching: boolean,
};

export class MustDropJackpotsPortal extends PureComponent<Props> {
  render() {
    const { isFetching } = this.props;

    return ReactDOM.createPortal(
      isFetching ? (
        <div>I'm a cute skeleton</div>
      ) : (
        <div>I'm must drop jackpots</div>
      ),
      document.getElementById(MUST_DROP_JACKPOTS_HOST_ID)
    );
  }
}

export default MustDropJackpotsPortal;
