// @flow
import React, { PureComponent } from "react";
import { ButtonPrimary } from "@casumo/cmp-button";

type Props = {
  /** text to render inside button */
  text: string,
  /** link for the button */
  type: string,
};

// TODO: Find a better way to scale this
export const ACTION_MAP = {
  "top-lists": "/games/top",
  "all-games": "/games/all",
  "all-red-tiger-games": "/games/must-drop-jackpots",
  "reel-races": "/reel-races",
  deposit: "/cash/deposit",
  sports: "/sports",
};
export class ContentButton extends PureComponent<Props> {
  render() {
    const { text, type } = this.props;
    const url = ACTION_MAP[type];

    return url ? (
      <div className="u-margin-bottom--xlg u-margin-x--lg">
        <ButtonPrimary className="u-width--full" href={url}>
          {text}
        </ButtonPrimary>
      </div>
    ) : null;
  }
}
