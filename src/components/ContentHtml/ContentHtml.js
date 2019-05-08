// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import DangerousHtml from "Components/DangerousHtml";
import "./ContentHtml.scss";

type Props = {
  html: string,
  style: string,
};

const classes = "s-content-html u-padding-horiz--lg u-margin-bottom--lg";

export class ContentHtml extends PureComponent<Props> {
  render() {
    const { html, style = "" } = this.props;
    const componentClasses = classNames(
      classes,
      style && `s-content-html--${style}`
    );
    return (
      <div className={componentClasses}>
        <DangerousHtml element="div" html={html} />
      </div>
    );
  }
}
