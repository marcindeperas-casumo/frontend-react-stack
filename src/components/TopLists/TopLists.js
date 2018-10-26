import React, { PureComponent, Fragment } from "react";
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
        <CuratedCard />
        {listIds.map(listId => {
          return <TopListContainer key={listId} listId={listId} />;
        })}
        <Jackpots />
      </Fragment>
    );
  }
}

export default TopLists;
