import React, { PureComponent, Fragment } from "react";
import classNames from "classnames";
import TopListContainer from "Containers/TopListContainer";
import CuratedCardContainer from "Containers/CuratedCardContainer";

export class TopLists extends PureComponent {
  render() {
    const { listIds } = this.props;
    return (
      <Fragment>
        <CuratedCardContainer
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
      </Fragment>
    );
  }
}

export default TopLists;
