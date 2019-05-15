// @flow
import React, { PureComponent } from "react";
import ComponentBuilder from "Components/ComponentBuilder";
import { PlayerValuableListHorizontal } from "Components/PlayerValuableListHorizontal";

export const getSlug = (market: string = "___en") =>
  `built-pages.top-lists-${market}`;

type Props = {
  market: string,
  fetchTopLists: Function,
  isGameListLoaded: boolean,
};

export default class TopLists extends PureComponent<Props> {
  componentDidMount() {
    if (!this.props.isGameListLoaded) {
      this.props.fetchTopLists();
    }
  }

  render() {
    const { market } = this.props;
    const slug = getSlug(market);

    // TODO remove PlayerValuableListHorizontal from here when Account Page is ready
    return (
      <React.Fragment>
        <PlayerValuableListHorizontal />
        <ComponentBuilder slug={slug} />
      </React.Fragment>
    );
  }
}
