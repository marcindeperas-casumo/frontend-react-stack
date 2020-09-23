// @flow
import React from "react";
import cx from "classnames";
import ReelRaceIconSvg from "../icons/rrIcon.svg";

import "../ReelRaceIcon.scss";

export const RRIconView = ({ className }: { className?: string }) => (
  <ReelRaceIconSvg className={cx("u-line-height--1", className)} />
);

// eslint-disable-next-line fp/no-mutation
RRIconView.displayName = "RRIconView";
