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

export const GameLinkButton = (props: TProps) => {
  return (
    <div
      className={classNames(
        "u-text-align-center",
        topMarginClasses,
        xPaddingClasses
      )}
    >
      <ButtonPrimary
        className="u-width--full@mobile u-width--full@phablet u-width--1/2@tablet u-width--1/3"
        onClick={() => launchGame({ slug: props.game })}
      >
        <span className="u-margin-right">{props.text}</span>
        <PlayIcon />
      </ButtonPrimary>
    </div>
  );
};
