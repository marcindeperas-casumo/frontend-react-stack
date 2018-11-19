// @flow
import React, { PureComponent } from "react";
import Button from "@casumo/cmp-button";

type Props = {
  /** text to render inside button */
  text: string,
  /** link for the button */
  href: string,
};

export default class ContentButton extends PureComponent<Props> {
  render() {
    const { text, href } = this.props;

    return (
      <Button className="u-width--1/1 u-margin-bottom--xlg" href={href}>
        {text}
      </Button>
    );
  }
}
