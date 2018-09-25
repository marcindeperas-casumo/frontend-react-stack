// @flow
import React, { Component } from "react";

import Flex from "@casumo/cmp-flex";
// import Text from "@casumo/cmp-text";
import Skeleton from "@casumo/cmp-skeleton";

// import CMSField from "Components/CMSField";
import { getCMSField } from "Services/CMSService";
import ResponsiveImage from "@casumo/cmp-responsive-image";

type Props = {
  className?: String,
};

type State = {
  background: string,
};

export default class Curated extends Component<Props, State> {
  state = {
    background: null,
  };

  getBackground = async () => {
    const src = await getCMSField({
      slug: "curated-component",
      field: "small_image",
      fallbackTextFn: () => {},
    });
    this.setState({ background: src });
  };

  async componentDidMount() {
    this.getBackground();
  }

  get curatedContent() {
    return <ResponsiveImage src={this.state.background} />;
  }

  get skeleton() {
    return (
      <Skeleton width="500" height="250">
        <rect x="0" y="0" rx="0" ry="0" width="500" height="250" />
      </Skeleton>
    );
  }

  render() {
    const { className } = this.props;
    const loading = this.state.background === null;

    return (
      <Flex className={className} direction="vertical" spacing="none">
        {loading ? this.skeleton : this.curatedContent}
      </Flex>
    );
  }
}
