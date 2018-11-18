// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";

type Props = {
  renderImage: Function,
  renderText: Function,
  className?: string,
};

export class Media extends PureComponent<Props> {
  renderImage() {
    const { renderImage } = this.props;
    return renderImage();
  }
  renderText() {
    const { renderText } = this.props;
    return renderText();
  }
  render() {
    const { renderImage, renderText, ...rest } = this.props;
    return (
      <Flex align="center" spacing="md" {...rest}>
        <Flex.Item>{this.renderImage()}</Flex.Item>
        <Flex.Block>{this.renderText()}</Flex.Block>
      </Flex>
    );
  }
}

export default Media;
