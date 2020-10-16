//@flow
import { connect } from "react-redux";
import {
  playerCasumoNameSelector,
  emailSelector,
  playerNameSelector,
  playerIdSelector,
} from "Models/handshake";
import { ProfileIconWithDrawer } from "./ProfileIconWithDrawer";

export const ProfileIconWithDrawerContainer = connect(state => ({
  playerId: playerIdSelector(state),
  casumoName: playerCasumoNameSelector(state),
  email: emailSelector(state),
  playerName: playerNameSelector(state),
}))(ProfileIconWithDrawer);
