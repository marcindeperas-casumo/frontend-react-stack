import React from "react";
import MustDropJackpotsPortal, {
  MUST_DROP_JACKPOTS_HOST_ID,
} from "Components/MustDropJackpots/MustDropJackpotsPortal";
import WaitForHostElement from "Components/WaitForHostElement";
import { connect } from "react-redux";
import {
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
} from "Reducers/handshake/selectors";

const MustDropJackpotsContainer = connect(state => ({
  isFetching: !isGamesHandshakeLoaded && !isApplicationHandshakeLoaded,
}))(MustDropJackpotsPortal);

const WaitForMustDropJackpots = () => (
  <WaitForHostElement
    hostElementId={MUST_DROP_JACKPOTS_HOST_ID}
    component={MustDropJackpotsContainer}
  />
);

export default WaitForMustDropJackpots;
