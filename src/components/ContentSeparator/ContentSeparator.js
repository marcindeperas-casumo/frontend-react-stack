// @flow
import React, { PureComponent } from "react";

export class ContentSeparator extends PureComponent<{}> {
  render() {
    const className = `
      t-border-bottom
      u-margin-y--xlg
      u-margin-x--lg
    `;

    return <div className={className} />;
  }
}
