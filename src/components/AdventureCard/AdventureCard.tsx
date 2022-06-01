import React from "react";
import Flex from "@casumo/cmp-flex";
import cx from "classnames";
import type { Adventurer, AdventureContent } from "Models/adventure";
import AdventureAvatarAndDetails from "./AdventureAvatarAndDetails";
import AdventureProgressBar from "./AdventureProgressBar";
import "./AdventureCard.scss";

export type TAdventureCardProps = {
  adventurer: Adventurer;
  content: AdventureContent;
  showProgress: boolean;
};

const COMPONENT_CLASSNAME = "c-adventure-card";

export function AdventureCard({
  adventurer,
  content,
  showProgress,
}: TAdventureCardProps) {
  return (
    <div className="u-padding-y--md u-padding-left--md u-padding-x--md u-padding-x--none@desktop">
      <Flex
        align="center"
        className={cx(
          COMPONENT_CLASSNAME,
          "t-border-r--md bg-white",
          "u-padding-x--md u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop u-padding-y--lg",
          { "c-adventure-card__no-progress-bar": !showProgress }
        )}
        direction="vertical"
      >
        <AdventureAvatarAndDetails adventurer={adventurer} content={content} />

        {showProgress && (
          <AdventureProgressBar adventurer={adventurer} content={content} />
        )}
      </Flex>
    </div>
  );
}
