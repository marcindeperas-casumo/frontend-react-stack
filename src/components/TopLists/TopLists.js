import React, { PureComponent, Fragment } from "react";
import classNames from "classnames";
import TopListContainer from "Containers/TopListContainer";
import CuratedCard from "Components/CuratedCard";
import Jackpots from "Components/Jackpots";

export class TopLists extends PureComponent {
  render() {
    const { listIds } = this.props;

    // TODO: Define here explicitly which top-lists we need by
    // having wrapper components for all of them.
    return (
      <Fragment>
        <CuratedCard
          className={classNames(
            "u-margin-top--md",
            "u-margin-top--lg@tablet",
            "u-margin-top--lg@desktop",
            "u-margin-horiz--md",
            "u-margin-horiz--2xlg@tablet",
            "u-margin-horiz--2xlg@desktop"
          )}
        />
        {listIds.map(listId => {
          return <TopListContainer key={listId} listId={listId} />;
        })}
        <Jackpots />
      </Fragment>
    );
  }
}

export default TopLists;
