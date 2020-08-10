// @flow
import React, { PureComponent } from "react";
import Table from "@casumo/cmp-table";
import "./PromotionPrizeTable.scss";

type Props = {
  prizes: Array<Object>,
};

const Image = src => <img src={src} alt="" />;

const CashAmount = amount => (
  <p className="u-margin-bottom--none t-color-blue-50 u-font-weight-bold u-text-align-right">
    {amount}
  </p>
);

class PromotionPrizeTable extends PureComponent<Props> {
  render() {
    const { prizes } = this.props;

    return (
      <div className="u-margin-bottom--lg u-margin-x--lg">
        <Table
          className="c-prize-table"
          displayHeader={false}
          rows={prizes}
          thumbnail={Image}
          prize={CashAmount}
          cellPadding="y--md"
        />
      </div>
    );
  }
}

export default PromotionPrizeTable;
