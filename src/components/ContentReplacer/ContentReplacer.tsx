// @flow
import React, { PureComponent } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Utils/' or its corresponding t... Remove this comment to see the full error message
import { interpolate } from "Utils/";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  value: string,
  // @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
  replacements: { [string]: string | number },
  element?: string,
};

export class ContentReplacer extends PureComponent<Props> {
  render() {
    const { value, replacements, element } = this.props;
    const interpolated = interpolate(value, replacements);
    return <DangerousHtml element={element} html={interpolated} />;
  }
}
