// @flow
import React, { PureComponent } from "react";

type Props = {
  html: string,
  element: string,
  className: string,
};
// ⚠️ IMPORTANT
// This component is dangerous as it is easy to introduce
// a surface for a possible XSS attack.
// Always make sure know where the injected `html` prop
// comes from and that it is not editable by the user.
export default class DangerousHtml extends PureComponent<Props> {
  static defaultProps = {
    element: "span",
    className: "",
  };

  render() {
    const Element = this.props.element;

    return (
      <Element
        className={this.props.className}
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  }
}
