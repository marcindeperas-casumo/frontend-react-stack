import React, { PureComponent } from "react";

type OwnProps = {
  html: string;
  element: string;
  className: string;
};

type Props = OwnProps & typeof DangerousHtml.defaultProps;
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; dangerouslySetInnerHTML... Remove this comment to see the full error message
        className={this.props.className}
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  }
}
