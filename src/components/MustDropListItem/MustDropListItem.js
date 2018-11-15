// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  renderImage: Function,
  title?: string,
  titleColor: ?string,
  subTitle?: string,
  subTitleColor: ?string,
  className?: string,
};

export class ListItem extends PureComponent<Props> {
  render() {
    const {
      title,
      titleColor,
      subTitle,
      subTitleColor,
      renderImage,
      className = "",
    } = this.props;
    const titleClassName = classNames(
      "u-margin-bottom--sm u-font-weight-bold",
      titleColor && `t-color-${titleColor}`
    );
    const subTitleClassName = classNames(
      "u-margin-bottom--none",
      subTitleColor && `t-color-${subTitleColor}`
    );
    return (
      <Flex align="center" spacing="md" className={className}>
        <Flex.Item>{renderImage()}</Flex.Item>
        <Flex.Block>
          {title && <Text className={titleClassName}>{title}</Text>}
          {subTitle && <Text className={subTitleClassName}>{subTitle}</Text>}
        </Flex.Block>
      </Flex>
    );
  }
}

export default ListItem;
