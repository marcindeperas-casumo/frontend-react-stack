// @flow
import { type PlayOkayReduxStore } from "Models/playOkay";

const playOkay: PlayOkayReduxStore = {
  loginTimeLimits: {
    daily: 0,
    weekly: 0,
    monthly: 0
  }
};

export default ({
  playOkay: {
    playOkay
  }
});