import React, { PureComponent } from "react";
import TopListContainer from "Containers/TopListContainer";

export class TopLists extends PureComponent {
  render() {
    const { listIds } = this.props;
    return listIds.map(listId => {
      return <TopListContainer key={listId} listId={listId} />;
    });
  }
}

export default TopLists;
