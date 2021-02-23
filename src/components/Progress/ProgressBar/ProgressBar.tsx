// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import "./ProgressBar.scss";

type Props = {
  progress: number,
  fillerClassNames?: string,
  trackClassNames?: string,
};

export const ProgressBarFiller = (props: Props) => {
  return (
    <div
      className={classNames(
        "c-progress-bar__filler t-border-r--pill u-padding-bottom u-overflow--hidden",
        props.trackClassNames
      )}
      style={{ width: `${props.progress}%` }}
    />
  );
};

export class ProgressBar extends PureComponent<Props> {
  static defaultProps = {
    progress: 0,
    fillerClassNames: "t-background-purple-60",
    trackClassNames: "t-background-grey-0",
  };

  render() {
    return (
      <div
        className={classNames(
          "c-progress-bar t-border-r--pill u-padding--sm",
          this.props.fillerClassNames
        )}
      >
        <ProgressBarFiller {...this.props} />
      </div>
    );
  }
}
