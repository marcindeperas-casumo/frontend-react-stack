import React, { PureComponent } from "react";

export default class ContentSeparator extends PureComponent {
  render() {
    const className = `
      t-border-bottom
      t-border--current-color
      t-color-grey-light-2
      u-margin-vert--xlg
      u-margin-horiz--lg
    `;

    return <div className={className} />;
  }
}
