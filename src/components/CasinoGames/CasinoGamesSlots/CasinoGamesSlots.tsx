import Markdown from "markdown-to-jsx";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { useTranslations } from "Utils/hooks";

const layoutSelectorCmsTypes = {
  ONE_COL_WITH_IMG: "one_col_with_img",
  TWO_COL_WITH_IMG: "two_col_with_img",
};
const markdownOptions = {
  overrides: {
    p: {
      component: Text,
      props: {
        size: "sm",
        className: "u-padding-bottom--sm",
      },
    },
  },
};
const LayoutAwareTextPlusImage = ({ layout_selector, free_text, image }) => {
  const mapping = {
    [layoutSelectorCmsTypes.ONE_COL_WITH_IMG]: (
      <>
        {free_text && (
          <Markdown options={markdownOptions}>{free_text}</Markdown>
        )}
        {image && <img src={image} alt="" className="u-margin-y--md" />}
      </>
    ),
    [layoutSelectorCmsTypes.TWO_COL_WITH_IMG]: (
      <Flex
        align="center"
        className="u-padding-y o-flex--vertical@mobile o-flex--vertical@phablet"
      >
        {image && (
          <img
            src={image}
            alt=""
            className="u-margin-y--md@mobile u-margin-y--md@phablet"
          />
        )}
        {free_text && (
          <Flex.Item className="u-margin-left--lg@tablet u-margin-left--lg@desktop">
            <Markdown options={markdownOptions}>{free_text}</Markdown>
          </Flex.Item>
        )}
      </Flex>
    ),
  };

  return (
    mapping[layout_selector] || mapping[layoutSelectorCmsTypes.ONE_COL_WITH_IMG]
  );
};

const Content = props => (
  <Flex direction="vertical">
    {props.heading_text && (
      <Text
        size="lg"
        className="u-font-weight-bold u-margin-bottom--lg u-padding-top--md"
      >
        {props.heading_text}
      </Text>
    )}
    <LayoutAwareTextPlusImage {...props} />
    {(props.repeater || []).map((x, i) => (
      <Flex key={i} align="center" className="u-padding-y">
        {x.image && (
          <img
            src={x.image}
            alt=""
            className="u-margin-y--md u-width--2/5@mobile u-width--2/5@phablet"
          />
        )}
        {x.image_top && (
          <img
            src={x.image_top}
            alt=""
            className="u-width--2/5@mobile u-width--2/5@phablet"
          />
        )}
        {x.free_text && (
          <Flex.Item>
            <Markdown options={markdownOptions}>{x.free_text}</Markdown>
          </Flex.Item>
        )}
      </Flex>
    ))}
  </Flex>
);
export const CasinoGamesSlots = () => {
  /**
   * Those slugs come from "layout_modules" on game-categories.slots
   * This page was made for single use, treats all "layout_selector" in
   * the same way, and hopefully only reason to touch it will be its removal...
   */
  const arr = [
    useTranslations("game-categories-layouts.slots-2.how-to-play-slots-2"),
    useTranslations("game-categories-layouts.slots-2.slot-machine-anatomy"),
    useTranslations(
      "game-categories-layouts.slots-2.slot-machine-anatomy-items"
    ),
    useTranslations("game-categories-layouts.slots-2.winning-in-slots"),
    useTranslations("game-categories-layouts.slots-2.ways-to-win"),
    useTranslations(
      "game-categories-layouts.slots-2.wild-feature-symbols-repeater"
    ),
    useTranslations("game-categories-layouts.slots-2.other-feature-symbols"),
    useTranslations(
      "game-categories-layouts.slots-2.other-feature-symbols-repeater"
    ),
    useTranslations("game-categories-layouts.slots-2.game-features"),
    useTranslations("game-categories-layouts.slots-2.game-features-repeater"),
    useTranslations("game-categories-layouts.slots-2.expert-stuff"),
    useTranslations("game-categories-layouts.slots-2.expert-stuff-repeater"),
    useTranslations("game-categories-layouts.slots-2.game-providers"),
    useTranslations("game-categories-layouts.slots-2.welcome-offer"),
    useTranslations("game-categories-layouts.slots-2.favorite-games"),
  ];

  return (
    <div className="u-padding-x--md">
      {arr.filter(Boolean).map((x, i) => (
        <Content key={i} {...x} />
      ))}
    </div>
  );
};
