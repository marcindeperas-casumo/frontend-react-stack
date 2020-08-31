// @flow
import * as React from "react";
import * as R from "ramda";
import logger from "Services/logger";
import { interpolate } from "Utils";
import { ModalHeader, type ModalContentComponent } from "Components/RSModal";

type GameRoundDetailsContent = {
  text_fields: Array<{ key: string, value: string }>,
};

const gameRoundDetailsUrl =
  "/casino-player/game-round-history-generator/api/v1/round-summary/{{{ gameRoundId }}}/generate";

export function GameRoundDetails(
  props: ModalContentComponent<GameRoundDetailsContent>
) {
  const [iframeUrl, setIframeUrl] = React.useState<?string>();
  React.useEffect(() => {
    const url = interpolate(gameRoundDetailsUrl, {
      // $FlowIgnore
      gameRoundId: props.config.gameRoundId,
    });

    if (!iframeUrl) {
      fetch(url, {
        method: "POST",
      })
        .then(response => response.json())
        .then(x => x.url)
        .then(setIframeUrl)
        .catch(error => {
          logger.error(error);

          return null;
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!props.t) {
    return null;
  }

  const modalTitle = R.pipe(
    R.find(x => x.key === "modal_title"),
    R.prop("value")
  )(props.t.text_fields);

  return (
    <>
      <ModalHeader
        showCloseButton
        closeAction={props.closeModal}
        title={modalTitle}
      />
      {iframeUrl && <iframe title={modalTitle} height="100%" src={iframeUrl} />}
    </>
  );
}
