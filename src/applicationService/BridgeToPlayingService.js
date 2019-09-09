import { playingAction } from "Models/playing";
import { REACT_APP_EVENT_PLAYING } from "../constants";
import bridge from "../DurandalReactBridge";

const BridgeToPlayingService = store => {
  const dispatch = data => store.dispatch(playingAction(data));

  bridge.on(REACT_APP_EVENT_PLAYING, dispatch);
};

export default BridgeToPlayingService;
