//@flow
import { useDispatch } from "react-redux";
import { playingAction } from "Models/playing";
import type { Playing } from "Models/playing";

export const useDispatchPlaying = (playing: Playing) =>
  useDispatch()(playingAction(playing));
