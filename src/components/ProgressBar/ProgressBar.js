// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";

import "./ProgressBar.scss";

type Props = {
  progress: number,
};

const Filler = (props: Props) => {
  return (
    <Flex
      className="c-progress-bar__filler t-border-r--pill"
      align="center"
      justify="center"
      style={{ width: `${props.progress}%` }}
    >
      <Flex.Block>
        <div className="c-progress-bar__filler__highlight u-padding-bottom--sm u-margin-bottom--sm t-border-r--pill t-background-yellow-light-2" />
      </Flex.Block>
    </Flex>
  );
};

class ProgressBar extends PureComponent<Props> {
  render() {
    return (
      <div className="c-progress-bar u-padding--sm t-color-yellow t-border-r--pill">
        <Filler progress={this.props.progress} />
      </div>
    );
  }

  static defaultProps = {
    progress: 0,
  };
}

export default ProgressBar;
