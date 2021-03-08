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
  // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
  email: emailSelector(state),
  // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
  playerName: playerNameSelector(state),
}))(ProfileIconWithDrawer);
