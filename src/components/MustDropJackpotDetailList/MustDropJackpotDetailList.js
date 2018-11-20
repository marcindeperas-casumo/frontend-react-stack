// @flow
import React, { PureComponent } from "react";
import List from "Components/List";
import MustDropJackpotDetailListItem from "Components/MustDropJackpotDetailListItem";

type Props = {
  jackpotDetails: Array<Object>,
};

class MustDropJackpotDetailList extends PureComponent<Props> {
  render() {
    const { jackpotDetails } = this.props;
    return (
      <div className="u-margin-bottom--lg">
        <List
          itemSpacing="md"
          items={jackpotDetails}
          render={item => (
            <MustDropJackpotDetailListItem
              imageSrc={item.imageSrc}
              title={item.title}
              subTitle={item.subTitle}
            />
          )}
        />
      </div>
    );
  }
}

export default MustDropJackpotDetailList;
