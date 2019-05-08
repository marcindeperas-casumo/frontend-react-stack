// @flow
import React, { PureComponent } from "react";

export class ContentSeparator extends PureComponent<{}> {
  render() {
    const className = `
      t-border-bottom
      u-margin-vert--xlg
      u-margin-horiz--lg
    `;

    return <div className={className} />;
  }
}
