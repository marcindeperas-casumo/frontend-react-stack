import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import DangerousHtml from "Components/DangerousHtml";
import ImageLazy from "Components/Image/ImageLazy";

export const PromotionCardContent = ({ title, badge, dates }) => {
  return (
    <>
      <Flex
        className="p-md u-line-height--1 u-height--full"
        justify="space-between"
        align="start"
      >
        <Flex.Item className="w-2/3">
          <Text tag="div" className="text-grey-90 u-font-weight-bold" size="sm">
            <DangerousHtml html={title} />
          </Text>
        </Flex.Item>
        <Flex.Item
          className={classNames(
            "o-flex__item--no-shrink",
            "u-padding-top--2xlg",
            "u-height--full",
            "border-grey-5",
            "border-r"
          )}
        ></Flex.Item>
        <Flex.Item className="w-1/3">
          <Text
            tag="strong"
            className="text-purple-60 u-text-transform-uppercase"
            size="2xs"
          >
            {dates}
          </Text>
        </Flex.Item>

        {badge && (
          <Flex.Item className={classNames("o-flex__item--no-shrink")}>
            <ImageLazy
              className="u-display--block"
              // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
              width="40px"
              // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
              height="40px"
              src={badge}
              imgixOpts={{ w: 40, h: 40 }}
            />
          </Flex.Item>
        )}
      </Flex>
    </>
  );
};
