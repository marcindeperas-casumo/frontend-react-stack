import React, { PureComponent } from "react";
import "./ContentSeparator.scss";

export default class ContentSeparator extends PureComponent {
  render() {
    const className = `
      c-content-separator
      u-margin-vert--xlg
      u-padding-horiz--xlg
      u-padding-horiz--lg@mobile
    `;

    return <div className={className} />;
  }
}
