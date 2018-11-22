// @flow
import React, { PureComponent } from "react";
import PromotionCardTeaser from "Components/PromotionCardTeaser";
import classNames from "classnames";
import "./PromotionCardTeaserList.scss";

type Props = {
  isFetched: boolean,
  startFetch: () => void,
  promotionsSlugs: Array<string>,
  backgroundColor?: string,
};

class PromotionCardTeaserList extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const { promotionsSlugs, backgroundColor } = this.props;

    if (!promotionsSlugs.length) {
      return null;
    }

    return (
      <div
        className={classNames(
          backgroundColor && `t-background-${backgroundColor}`,
          "c-promotion-card-teaser-list u-padding-top--xlg u-padding-bottom--md u-padding-horiz--md"
        )}
      >
        {promotionsSlugs.map(promotionSlug => (
          <div className="u-margin-bottom--md" key={promotionSlug}>
            <PromotionCardTeaser
              slug={`promotions.${promotionSlug}`}
              link={`promotions/${promotionSlug}`}
              key={promotionSlug}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default PromotionCardTeaserList;
