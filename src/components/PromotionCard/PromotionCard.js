// @flow
import React, { PureComponent } from "react";
// import CMSField from "Components/CMSField";
import Text from "@casumo/cmp-text";
import Card from "@casumo/cmp-card";
import Flex from "@casumo/cmp-flex";
import PromotionCardSkeleton from "./PromotionCardSkeleton";
import ImageLazy from "Components/Image/ImageLazy";
import "./PromotionCard.scss";

const PROMOTIONS_URL = "/en/promotions";

export type Props = {
  isFetched: boolean,
  slug: string,
};

const PromotionCardHeader = slug => (
  <Flex className="u-padding-horiz--lg" justify="space-between" align="end">
    <Text tag="strong" className="t-color-red" size="xs">
      30 NOV - 1 JAN
      {/* <CMSField slug={slug} field="" /> */}
    </Text>
    <div style={{ background: "red", width: "40px", height: "40px" }} />{" "}
    {/* put a badge here, coming from the CMS */}
  </Flex>
);

const PromotionCardContent = slug => (
  <Text
    tag="div"
    className="c-promotion-card__content t-color-grey-dark-3 u-padding-horiz--lg u-padding-top u-padding-bottom--md u-font-weight-bold"
    size="lg"
  >
    Must Drop <br /> Jackpots
    {/* <CMSField slug={slug} field="" /> */}
  </Text>
);

const PromotionCardImage = () => (
  <ImageLazy
    className="u-display--block c-promotion-card__img u-margin"
    src="https://cms.casumo.com/wp-content/uploads/2018/10/testxmaspromo.png"
    imgixOpts={{ w: 240 }}
    dpr={3}
  />
);

const PromotionCardWrapper = ({ promotionCardURL, slug }) => {
  return (
    <a
      href={promotionCardURL}
      className="c-promotion-card o-ratio o-ratio--promotion-card o-flex__item o-flex__item-fixed-size"
      onMouseDown={e => e.preventDefault()}
    >
      <Card
        className="o-ratio__content t-border-r--16 t-background-grey-light-2"
        spacing="none"
        header={() => <PromotionCardHeader slug={slug} />}
        content={() => <PromotionCardContent slug={slug} />}
        footer={() => <PromotionCardImage />}
      />
    </a>
  );
};

export default class PromotionCard extends PureComponent<Props> {
  render() {
    const { isFetched, slug } = this.props;
    const promotionCardURL = `${PROMOTIONS_URL}/${slug}`;

    // switch from true to isFetched 👇🏻
    return true ? (
      <PromotionCardWrapper slug={slug} promotionCardURL={promotionCardURL} />
    ) : (
      <PromotionCardSkeleton />
    );
  }
}
