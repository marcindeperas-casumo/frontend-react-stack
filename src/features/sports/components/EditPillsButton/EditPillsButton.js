// @flow

import React from "react";
import classNames from "classnames";
import { CrossIcon } from "@casumo/cmp-icons";

import "./EditPillsButton.scss";

type Props = {
  /** onClick handler for the edit button */
  onClick: () => void,
  /** className overrides to restyle the button */
  className?: string,
};

export const defaultClasses = "t-color-grey t-background-grey-light-2";

const EditPillsButton = ({ onClick, className = defaultClasses }: Props) => (
  <span
    className={classNames("c-edit-pills-button", className)}
    onClick={onClick}
  >
    <CrossIcon />
  </span>
);

export default EditPillsButton;
