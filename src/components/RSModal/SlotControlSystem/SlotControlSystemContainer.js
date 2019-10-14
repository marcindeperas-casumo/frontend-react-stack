// @flow
import { connect } from "react-redux";
import { hideModal } from "Models/modal";
import { finishConfiguration } from "Services/SlotControlSystemService";
import { SlotControlSystem } from "./SlotControlSystem";

export const SlotControlSystemContainer = connect(
  null,
  dispatch => ({
    hideModalSuccess: () => {
      dispatch(hideModal());
      finishConfiguration();
    },
  })
)(SlotControlSystem);
