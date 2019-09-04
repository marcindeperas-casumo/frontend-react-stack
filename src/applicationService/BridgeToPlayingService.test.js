import { playingAction, PLAYING_STATE } from "Models/playing";
import { REACT_APP_EVENT_PLAYING } from "../constants";
import bridge from "../DurandalReactBridge";
import BridgeToPlayingService from "./BridgeToPlayingService";
jest.mock("../DurandalReactBridge");

beforeEach(() => {
  jest.resetAllMocks();
});

test("listen to REACT_APP_EVENT_PLAYING event", () => {
  const dispatch = jest.fn();
  BridgeToPlayingService({ dispatch });

  expect(bridge.on).toHaveBeenCalledTimes(1);
  expect(bridge.on).toHaveBeenCalledWith(
    REACT_APP_EVENT_PLAYING,
    expect.anything()
  );
});

test("should call dispatch with event data", () => {
  const dispatch = jest.fn();
  BridgeToPlayingService({ dispatch });

  const eventName = bridge.on.mock.calls[0][0];
  expect(eventName).toEqual(REACT_APP_EVENT_PLAYING);

  const callback = bridge.on.mock.calls[0][1];
  const gameId = ["foo"];
  const state = PLAYING_STATE.STARTED;

  callback({ state, gameId });

  expect(dispatch).toBeCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(playingAction({ gameId, state }));
});
