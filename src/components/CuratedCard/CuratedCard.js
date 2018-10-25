// @flow
import React, { PureComponent } from "react";

import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import CuratedCardFooter from "Components/CuratedCard/CuratedCardFooter";
import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";
import CuratedCardSkeleton from "Components/CuratedCard/CuratedCardSkeleton";
import { stringToHTML } from "Utils/index";

import "./CuratedCard.scss";

const justify = {
  mobile: "end",
  default: "space-between",
};

const spacing = {
  mobile: "2xlg",
  default: "lg",
};

export type Props = {|
  data: {},
|};

export default class CuratedCard extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, fetchCurated } = this.props;

    if (!isFetched) {
      fetchCurated();
    }
  }

  renderHeader = () => {
    const { data } = this.props;

    return (
      <Text
        className="u-font-weight-bold u-text-transform-uppercase t-color-white"
        size="2xlg"
        tag="span"
        dangerouslySetInnerHTML={stringToHTML(data.header)}
      />
    );
  };

  renderFooter = () => {
    const { data } = this.props;

    return data.game.length ? (
      <CuratedCardFooter
        game={data.gameData}
        primaryActionText={data.primary_action_text}
      />
    ) : (
      <Text
        className="t-color-white"
        size="sm"
        tag="span"
        dangerouslySetInnerHTML={stringToHTML(data.promotions_legal_text)}
      />
    );
  };

  render() {
    const { data, isFetched } = this.props;

    return (
      <div className="u-margin-top--md u-margin-top--lg@tablet u-margin-top--lg@desktop u-margin-horiz--md u-margin-horiz--2xlg@tablet u-margin-horiz--2xlg@desktop">
        {!isFetched ? (
          <CuratedCardSkeleton />
        ) : (
          <div className="c-curated-card o-ratio o-ratio--curated-card t-border-r--8">
            <CuratedCardBackground {...data} />
            <Card
              className="o-ratio__content u-pointer-events-none u-padding--md@mobile u-padding--lg"
              justify={justify}
              spacing={spacing}
              header={this.renderHeader}
              footer={this.renderFooter}
            />
          </div>
        )}
      </div>
    );
  }
}
