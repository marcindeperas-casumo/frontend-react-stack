import React, { PureComponent } from "react";
import { interpolate } from "Utils";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  value: string;
  replacements: { [s: string]: string | number };
  element?: string;
};

export class ContentReplacer extends PureComponent<Props> {
  render() {
    const { value, replacements, element } = this.props;
    const interpolated = interpolate(value, replacements);
    return <DangerousHtml element={element} html={interpolated} />;
  }
}
