import React, { PureComponent } from "react";

// ⚠️ IMPORTANT
// This component is dangerous as it is easy to introduce
// a surface for a possible XSS attack.
// Always make sure know where the injected `html` prop
// comes from and that it is not editable by the user.
export default class Html extends PureComponent {
  render() {
    const { html } = this.props;

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}
