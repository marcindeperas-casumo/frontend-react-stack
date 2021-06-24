import React, { PureComponent } from "react";
import cx from "classnames";
import { ButtonPrimary } from "@casumo/cmp-button";

type Props = {
  /** text to render inside button */
  text: string;
  /** link for the button */
  type: string;
  /** The Column width this item should span in the grid layout, currently supporting 2 columns  */
  gridColumnWidth?: string;
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
    const { text, type, gridColumnWidth = "2" } = this.props;
    const url = ACTION_MAP[type];

    return url ? (
      <div
        className={cx(
          "mb-xlg m-lg",
          gridColumnWidth && `col-span-${gridColumnWidth}`
        )}
      >
        <ButtonPrimary className="u-width--full" href={url}>
          {text}
        </ButtonPrimary>
      </div>
    ) : null;
  }
}
