// @flow
import * as React from "react";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_PLAYING } from "Src/constants";
import "./ReelRaceWidget.scss";

type Props = {
  initReelRaceWidget: () => void,
};

export function ReelRaceWidget(props: Props) {
  const [gameId, setGameId] = React.useState();

  React.useEffect(() => props.initReelRaceWidget(), [props]);
  React.useEffect(() => {
    const playing = data => setGameId(data.gameId);

    return bridge.on(REACT_APP_EVENT_PLAYING, playing);
  });

  return <div className="u-margin-bottom--3xlg">{gameId}</div>;
}
