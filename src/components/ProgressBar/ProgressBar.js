// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import "./ProgressBar.scss";

export const colorOptions = {
  background: ["grey-dark-4", "grey"],
  foreground: ["yellow", "green", "violet"],
};

type Props = {
  progress: number,
  foregroundColor: "yellow" | "green" | "violet",
  backgroundColor: "grey-dark-4" | "grey",
};

export const ProgressBarFiller = (props: Props) => {
  return (
    <div
      className={classNames(
        `c-progress-bar__filler t-border-r--pill u-overflow-hidden`,
        `t-background-${props.foregroundColor}`
      )}
      style={{ width: `${props.progress}%` }}
    >
      <div
        className={classNames(
          `c-progress-bar__highlight u-padding-bottom--sm u-margin-bottom--sm t-border-r--pill u-overflow-hidden`,
          `t-background-${props.foregroundColor}-light-2`
        )}
      />
    </div>
  );
};

export class ProgressBar extends PureComponent<Props> {
  static defaultProps = {
    progress: 0,
    foregroundColor: "yellow",
    backgroundColor: "grey-dark-4",
  };

  render() {
    return (
      <div
        className={classNames(
          `c-progress-bar u-padding--sm t-border-r--pill`,
          `t-background-${this.props.backgroundColor}`
        )}
      >
        <ProgressBarFiller {...this.props} />
      </div>
    );
  }
}
