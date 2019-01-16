// @flow
import React, { PureComponent } from "react";
import ComponentBuilder from "Components/ComponentBuilder";

export const getSlug = (market: string = "___en") =>
  `built-pages.top-lists-${market}`;

type Props = {
  market: string,
  fetchTopLists: Function,
};

export default class TopLists extends PureComponent<Props> {
  render() {
    const { market, fetchTopLists } = this.props;
    const slug = getSlug(market);

    fetchTopLists();

    return <ComponentBuilder slug={slug} />;
  }
}
