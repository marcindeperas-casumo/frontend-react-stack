// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import "./ProgressBar.scss";

type Props = {
  progress: number,
  className?: string,
};

export const ProgressBarFiller = (props: Props) => {
  return (
    <div
      className={classNames(
        "c-progress-bar__filler t-border-r--pill",
        props.className
      )}
      style={{ width: `${props.progress}%` }}
    >
      <div>
        <div className="c-progress-bar__highlight u-padding-bottom--sm u-margin-bottom--sm t-border-r--pill" />
      </div>
    </div>
  );
};

export class ProgressBar extends PureComponent<Props> {
  render() {
    return (
      <div className="c-progress-bar u-padding--sm t-border-r--pill">
        <ProgressBarFiller {...this.props} />
      </div>
    );
  }

  static defaultProps = {
    progress: 0,
    className: "t-color-yellow",
  };
}
