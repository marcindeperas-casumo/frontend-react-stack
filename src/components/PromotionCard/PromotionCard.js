// @flow
import React, { PureComponent } from "react";
import CMSField from "Components/CMSField";
import Text from "@casumo/cmp-text";
import Card from "@casumo/cmp-card";
import Flex from "@casumo/cmp-flex";
import PromotionCardSkeleton from "./PromotionCardSkeleton";
import ImageLazy from "Components/Image/ImageLazy";
import "./PromotionCard.scss";

export type Props = {
  isFetched: boolean,
  promotionSlug: string,
  parentSlug: string,
  promotionPage: Array<Object>,
};

const PromotionCardHeader = ({ slug, promotionPage }) => (
  <Flex className="u-padding-horiz--lg" justify="space-between" align="end">
    <Text tag="strong" className="t-color-red" size="xs">
      <CMSField slug={slug} field="dates" />
    </Text>
    <ImageLazy
      className="u-display--block"
      width="40px"
      height="40px"
      src={promotionPage.fields.campaign_badge}
      imgixOpts={{ w: 40, h: 40 }}
      dpr={3}
    />
  </Flex>
);

const PromotionCardContent = ({ slug }) => (
  <Text
    tag="div"
    className="c-promotion-card__content t-color-grey-dark-3 u-padding-horiz--lg u-padding-top u-padding-bottom--md u-font-weight-bold"
    size="lg"
  >
    <CMSField slug={slug} field="title" />
  </Text>
);

const PromotionCardImage = ({ promotionPage }) => (
  <ImageLazy
    className="u-display--block c-promotion-card__img u-margin"
    src={promotionPage.fields.image}
    imgixOpts={{ w: 240 }}
    dpr={3}
  />
);

const PromotionCardWrapper = ({
  promotionCardURL,
  promotionCardSlug,
  promotionPage,
}) => {
  return (
    <a
      href={promotionCardURL}
      className="c-promotion-card o-ratio o-ratio--promotion-card o-flex__item o-flex__item-fixed-size"
      onMouseDown={e => e.preventDefault()}
    >
      <Card
        className="o-ratio__content t-border-r--16 t-background-grey-light-2"
        spacing="none"
        header={() => (
          <PromotionCardHeader
            slug={promotionCardSlug}
            promotionPage={promotionPage}
          />
        )}
        content={() => <PromotionCardContent slug={promotionCardSlug} />}
        footer={() => <PromotionCardImage promotionPage={promotionPage} />}
      />
    </a>
  );
};

export default class PromotionCard extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const { isFetched, promotionSlug, parentSlug, promotionPage } = this.props;
    const promotionCardURL = `${parentSlug}/${promotionSlug}`;
    const promotionCardSlug = `${parentSlug}.${promotionSlug}`;

    return isFetched ? (
      <PromotionCardWrapper
        promotionCardURL={promotionCardURL}
        promotionCardSlug={promotionCardSlug}
        promotionPage={promotionPage}
      />
    ) : (
      <PromotionCardSkeleton />
    );
  }
}
