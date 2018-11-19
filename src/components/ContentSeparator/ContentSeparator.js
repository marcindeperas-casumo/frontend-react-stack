import React, { PureComponent } from "react";

export default class ContentSeparator extends PureComponent {
  render() {
    const className = `
      u-width--1/1
      t-border-bottom
      u-margin-vert--xlg
      u-padding-horiz--xlg
      u-padding-horiz--lg@mobile
    `;

    return <div className={className} />;
  }
}
