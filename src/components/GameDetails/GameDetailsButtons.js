// @flow
import React from "react";
import { PlayIcon } from "@casumo/cmp-icons";
import Button from "@casumo/cmp-button";
import { launchGame } from "Services/LaunchGameService";

type Props = {
  slug: string,
  playButtonText: string,
  hasPlayForFun: boolean,
  practiceButtonText: string,
};

export const GameDetailsButtons = ({
  slug,
  playButtonText,
  hasPlayForFun,
  practiceButtonText,
}: Props) => (
  <div className="u-zindex--content-overlay u-position-fixed@mobile u-bottom-0 u-left-shell-offset u-right-0 t-background-white u-padding--md">
    <Button
      className="u-width--full u-margin-bottom--md"
      variant="primary"
      onClick={() => launchGame({ slug })}
    >
      <PlayIcon size="sm" className="u-margin-right--sm" />
      <span>{playButtonText}</span>
    </Button>

    {hasPlayForFun && (
      <Button
        className="u-width--full"
        variant="secondary"
        onClick={() =>
          launchGame({
            slug,
            hasPlayForFun,
          })
        }
      >
        {practiceButtonText}
      </Button>
    )}
  </div>
);
