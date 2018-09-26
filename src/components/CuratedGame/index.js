// @flow
import React, { Component } from "react";

import Flex from "@casumo/cmp-flex";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import Skeleton from "@casumo/cmp-skeleton";

import cmsService from "Services/CMSService";

type Props = {
  className?: String,
};

type State = {
  data: {},
};

export default class Curated extends Component<Props, State> {
  state = { data: null };

  async componentDidMount() {
    const response = await cmsService.getPage({ slug: "curated-component" });
    this.setState({ data: response });
  }

  get curatedCard() {
    const { data } = this.state;
    return <ResponsiveImage src={data.fields.small_image} />;
  }

  get curatedSkeleton() {
    return (
      <Skeleton width="500" height="250">
        <rect x="0" y="0" rx="0" ry="0" width="500" height="250" />
      </Skeleton>
    );
  }

  render() {
    const { className } = this.props;
    const { data } = this.state;

    return (
      <Flex className={className} direction="vertical" spacing="none">
        {data === null ? this.curatedSkeleton : this.curatedCard}
      </Flex>
    );
  }
}
