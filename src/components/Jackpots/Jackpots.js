// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils/utils";
import JackpotsTile from "./JackpotsTile";
import JackpotsTitle from "./JackpotsTitle";
import classNames from "classnames";
import "./Jackpots.scss";

export type Props = {
  ids: Array<string>,
  className?: string,
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
    const { ids, className } = this.props;
    const idsByColumns = generateColumns(ids);

    return (
      <div className={classNames("c-jackpots", className)}>
        <JackpotsTitle />
        <Scrollable>
          {idsByColumns.map((columnIds, i) => (
            <JackpotsTile ids={columnIds} key={`jackpots-tile-${i}`} />
          ))}
        </Scrollable>
      </div>
    );
  }
}