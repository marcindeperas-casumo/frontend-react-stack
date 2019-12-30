import { connect } from "react-redux";
import { initPlayOkayComplianceCheck } from "Models/compliance/denmark/playOkay.actions";
import { OverlayControler } from "./OverlayControler";

export const OverlayControlerContainer = connect(null, dispatch => ({
  init: () => dispatch(initPlayOkayComplianceCheck),
}))(OverlayControler);
