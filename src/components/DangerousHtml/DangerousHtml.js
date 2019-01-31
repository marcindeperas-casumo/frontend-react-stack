// @flow
import React, { PureComponent } from "react";

type Props = {
  html: string,
  element?: string,
};
// ⚠️ IMPORTANT
// This component is dangerous as it is easy to introduce
// a surface for a possible XSS attack.
// Always make sure know where the injected `html` prop
// comes from and that it is not editable by the user.
export default class DangerousHtml extends PureComponent<Props> {
  render() {
    const { html, element = "span" } = this.props;
    const Element = element;

    return <Element dangerouslySetInnerHTML={{ __html: html }} />;
  }
}
