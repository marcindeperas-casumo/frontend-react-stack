// @flow
import React, { PureComponent } from "react";

import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";

import ImageLazy from "Components/Image/ImageLazy";
import CuratedCardFooter from "Components/CuratedCard/CuratedCardFooter";
import type { Images } from "Components/Image/ImageAdaptive";
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
  data: any,
|};

export default class CuratedCard extends PureComponent<Props> {
  renderHeader = () => {
    const { data } = this.props;

    return (
      <Text
        className="u-font-weight-bold u-text-transform-uppercase t-color-white"
        size="2xlg"
        tag="span"
        dangerouslySetInnerHTML={stringToHTML(data.fields.header)}
      />
    );
  };

  renderFooter = () => {
    const { data } = this.props;

    return (
      <CuratedCardFooter
        game={data.game}
        primaryActionText={data.fields.primary_action_text}
      />
    );
  };

  onClick = () => {};

  renderBackground = (images: Images) => (
    <a className="o-ratio__content" href="/" onClick={this.onClick}>
      <ImageLazy
        className="o-ratio__content u-object-fit-cover"
        images={images}
      />
    </a>
  );

  render() {
    const { data } = this.props;

    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card t-border-r--8">
        {this.renderBackground(data.fields)}
        <Card
          className="o-ratio__content u-pointer-events-none u-padding--md@mobile u-padding--lg"
          justify={justify}
          spacing={spacing}
          header={this.renderHeader}
          footer={this.renderFooter}
        />
      </div>
    );
  }
}
