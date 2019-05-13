// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import "./ProgressBar.scss";

export const colourOptions = {
  background: ["grey-dark-4", "grey"],
  foreground: ["yellow", "green"],
};

type Props = {
  progress: number,
  foregroundColour: "yellow" | "green" | "violet",
  backgroundColour: "grey-dark-4" | "grey",
};

export const ProgressBarFiller = (props: Props) => {
  return (
    <div
      className={classNames(
        `c-progress-bar__filler t-border-r--pill`,
        `t-background-${props.foregroundColour}`
      )}
      style={{ width: `${props.progress}%` }}
    >
      <div
        className={classNames(
          `c-progress-bar__highlight u-padding-bottom--sm u-margin-bottom--sm t-border-r--pill`,
          `t-background-${props.foregroundColour}-light-2`
        )}
      />
    </div>
  );
};

export class ProgressBar extends PureComponent<Props> {
  static defaultProps = {
    progress: 0,
    foregroundColour: "yellow",
    backgroundColour: "grey-dark-4",
  };

  render() {
    return (
      <div
        className={classNames(
          `c-progress-bar u-padding--sm t-border-r--pill`,
          `t-background-${this.props.backgroundColour}`
        )}
      >
        <ProgressBarFiller {...this.props} />
      </div>
    );
  }
}
