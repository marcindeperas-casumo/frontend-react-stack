import React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import DangerousHtml from "Components/DangerousHtml";
import ImageLazy from "Components/Image/ImageLazy";

export const PromotionCardContent = ({ title, badge, dates, ctaText }) => {
  return (
    <>
      <Flex
        className="p-md h-full u-line-height--1"
        justify="space-between"
        align="start"
      >
        <Flex.Item className="w-3/5">
          <Text tag="div" className="text-grey-90 u-font-weight-bold" size="sm">
            <DangerousHtml html={title} />
          </Text>
        </Flex.Item>
        <Flex.Item
          className={classNames(
            "o-flex__item--no-shrink",
            "h-full",
            "border-grey-5",
            "border-r",
            "pt--2xlg",
            "mr-md"
          )}
        ></Flex.Item>
        <Flex className="w-2/5 h-full" direction="vertical" spacing="sm">
          <Flex.Block>
            <Text
              tag="strong"
              className="text-purple-60 u-text-transform-uppercase"
              size="2xs"
            >
              {dates}
            </Text>
          </Flex.Block>
          <Flex.Item>
            {ctaText && (
              <ButtonPrimary
                className="u-padding-x--sm"
                size="xs"
                variant="primary"
              >
                <span className="text-2xs">{ctaText}</span>
              </ButtonPrimary>
            )}
          </Flex.Item>
        </Flex>
        {badge && (
          <Flex.Item className={classNames("o-flex__item--no-shrink")}>
            <ImageLazy
              className="block"
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
