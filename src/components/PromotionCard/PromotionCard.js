// @flow
import React, { PureComponent } from "react";
import Card from "@casumo/cmp-card";
import PromotionCardHeader from "Components/PromotionCard/PromotionCardHeader";
import PromotionCardContent from "Components/PromotionCard/PromotionCardContent";
import PromotionCardImage from "Components/PromotionCard/PromotionCardImage";
import PromotionCardSkeleton from "Components/PromotionCard/PromotionCardSkeleton";
import "./PromotionCard.scss";

export type Props = {
  isFetched: boolean,
  promotionSlug: string,
  promotionPage: Array<Object>,
};

const PromotionCardWrapper = ({ promotionSlug, promotionPage }) => {
  return (
    <a
      href={promotionSlug}
      className="c-promotion-card o-ratio o-ratio--promotion-card o-flex__item o-flex__item-fixed-size"
      onMouseDown={e => e.preventDefault()}
    >
      <Card
        className="o-ratio__content t-border-r--16 t-background-grey-light-2"
        spacing="none"
        header={() => (
          <PromotionCardHeader
            slug={promotionSlug}
            promotionPage={promotionPage}
          />
        )}
        content={() => <PromotionCardContent slug={promotionSlug} />}
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
    const { isFetched, promotionSlug, promotionPage } = this.props;

    return isFetched ? (
      <PromotionCardWrapper
        promotionSlug={promotionSlug}
        promotionPage={promotionPage}
      />
    ) : (
      <PromotionCardSkeleton />
    );
  }
}
