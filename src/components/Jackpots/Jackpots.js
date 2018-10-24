// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils/utils";
import JackpotsTile from "./JackpotsTile";
import ScrollableListTitle from "Components/ScrollableListTitle";
import "./Jackpots.scss";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

export type Props = {
  ids: Array<string>,
  className?: string,
  title: string,
  subscribeToUpdates: () => void,
  unsubscribeFromUpdates: () => void,
};

export default class Jackpots extends PureComponent<Props> {
  componentDidMount() {
    this.props.subscribeToUpdates();
  }

  componentWillUnmount() {
    this.props.unsubscribeFromUpdates();
  }

  render() {
    const { ids, title } = this.props;
    const idsByColumns = generateColumns(ids);

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing="md">
          {idsByColumns.map((columnIds, i) => (
            <JackpotsTile ids={columnIds} key={`jackpots-tile-${i}`} />
          ))}
        </Scrollable>
      </div>
    );
  }
}
