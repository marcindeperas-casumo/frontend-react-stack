// @flow
import React, { Component } from "react";
import { head } from "ramda";

import Flex from "@casumo/cmp-flex";

import cmsService from "Services/CMSService";
import GameBrowserService from "Services/GameBrowserService";

import CuratedCard from "Components/CuratedCard/CuratedCard";
import CuratedCardSkeleton from "Components/CuratedCard/CuratedCardSkeleton";

type Props = {
  className?: string,
};

type State = {
  data: Object,
  loading: boolean,
  loading: boolean,
};

export default class CuratedContainer extends Component<Props, State> {
  state = { data: {}, loading: true };

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
        loading: false,
      });
    } catch (e) {
      throw new Error("CuratedCard failed trying to fetch data", e);
    }
  }

  render() {
    const { className } = this.props;
    const { data, loading } = this.state;

    return (
      <Flex className={className} direction="vertical" spacing="none">
        {loading ? <CuratedCardSkeleton /> : <CuratedCard data={data} />}
      </Flex>
    );
  }
}
