// @flow
import { connect } from "react-redux";
import { hideModal as hideModalAction } from "Models/modal";
import { MODALS } from "Models/slotControlSystem";
import { finishConfiguration } from "Services/SlotControlSystemService";
import { SlotControlSystem } from "./SlotControlSystem";

export const SlotControlSystemContainer = connect(
  null,
  dispatch => ({
    hideModal: () => {
      dispatch(hideModalAction(MODALS.CONFIGURATION));
      finishConfiguration();
    },
  })
)(SlotControlSystem);
