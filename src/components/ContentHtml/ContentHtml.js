// @flow
import React, { PureComponent } from "react";
import DangerousHtml from "Components/DangerousHtml";
import "./ContentHtml.scss";

type Props = {
  html: string,
};

class ContentHtml extends PureComponent<Props> {
  render() {
    const { html } = this.props;
    return (
      <div
        className="
        s-content-html
        u-padding-horiz--lg
        u-margin-bottom--lg"
      >
        <DangerousHtml element="div" html={html} />
      </div>
    );
  }
}

export default ContentHtml;
