//@flow
import * as React from "react";
import { useDispatch } from "react-redux";
import { playingAction } from "Models/playing";
import type { Playing } from "Models/playing";

export const useDispatchPlaying = ({ isPlaying, gameId }: Playing) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(playingAction({ isPlaying, gameId }));
  }, [dispatch, gameId, isPlaying]);
};
