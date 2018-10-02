// @flow
import React, { Component } from "react";
import { head } from "ramda";

import Flex from "@casumo/cmp-flex";
import Skeleton from "@casumo/cmp-skeleton";

import cmsService from "Services/CMSService";
import GameBrowserService from "Services/GameBrowserService";

import CuratedCard from "Components/CuratedCard/CuratedCard";

type Props = {
  className?: string,
};

type State = {
  data: ?{},
};

export default class CuratedContainer extends Component<Props, State> {
  state = { data: null };

  async componentDidMount() {
    try {
      const curatedData = await cmsService.getPage({
        slug: "curated-component",
      });
      const gameData = await GameBrowserService.gamesBySlugs({
        slugs: curatedData.fields.game,
      });

      this.setState({
        data: {
          ...curatedData,
          game: head(gameData.games),
        },
      });
    } catch (error) {
      // handle error
    }
  }

  get renderCard() {
    const { data } = this.state;
    return <CuratedCard data={data} />;
  }

  get renderSkeleton() {
    return (
      <Skeleton width="500" height="352">
        <rect x="0" y="0" rx="0" ry="0" width="500" height="352" />
      </Skeleton>
    );
  }

  render() {
    const { className } = this.props;
    const { data } = this.state;

    return (
      <Flex className={className} direction="vertical" spacing="none">
        {!data ? this.renderSkeleton : this.renderCard}
      </Flex>
    );
  }
}
