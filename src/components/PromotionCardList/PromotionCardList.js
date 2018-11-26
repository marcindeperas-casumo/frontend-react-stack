// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import PromotionCardContainer from "Components/PromotionCard";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { createModifierClasses } from "@casumo/cudl-react-utils";

type Props = {
  promotionsSlugs: Array<string>,
  fetch: () => void,
  title?: string,
  titleColor?: string,
  backgroundColor?: string,
};

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

const marginPerDevice = {
  default: "lg",
  tablet: "xlg",
  desktop: "xlg",
};

class PromotionCardList extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { title, titleColor, backgroundColor, promotionsSlugs } = this.props;
    const hasNoPromotionSlugs = !promotionsSlugs || !promotionsSlugs.length;

    if (hasNoPromotionSlugs) {
      return null;
    }

    return (
      <div
        className={classNames(
          backgroundColor && `t-background-${backgroundColor}`,
          titleColor && `t-color-${titleColor}`,
          createModifierClasses("u-margin-top", marginPerDevice),
          "u-padding-top--lg u-padding-bottom--lg"
        )}
      >
        <ScrollableListTitle title={title} />
        <Scrollable padding={paddingPerDevice} itemSpacing="md">
          {promotionsSlugs.map(promotionSlug => (
            <PromotionCardContainer
              slug={`promotions.${promotionSlug}`}
              link={`promotions/${promotionSlug}`}
              key={promotionSlug}
            />
          ))}
        </Scrollable>
      </div>
    );
  }
}

export default PromotionCardList;
