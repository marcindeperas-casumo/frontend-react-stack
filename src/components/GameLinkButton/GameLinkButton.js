// @flow
import React from "react";
import classNames from "classnames";
import { ButtonPrimary } from "@casumo/cmp-button";
import { PlayIcon } from "@casumo/cmp-icons";
import { launchGame } from "Services/LaunchGameService";
import {
  topMarginClasses,
  xPaddingClasses,
} from "Components/GameListHorizontal/constants";

type TProps = {
  text: string,
  game: string,
};

export const GameLinkButton = (props: TProps) => (
  <div
    className={classNames(
      "u-text-align-center",
      topMarginClasses,
      xPaddingClasses
    )}
  >
    <ButtonPrimary
      className="u-width--full@mobile u-padding-x--lg"
      onClick={() => launchGame({ slug: props.game })}
    >
      <PlayIcon />
      <span className="u-margin-left--md">{props.text}</span>
    </ButtonPrimary>
  </div>
);
