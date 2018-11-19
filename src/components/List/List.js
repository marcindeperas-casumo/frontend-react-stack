// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import "Components/List/List.scss";

type Props = {
  items: Array<mixed>,
  itemSpacing: Array<String> | string,
  render: Function,
};

export class List extends PureComponent<Props> {
  renderItem(item: mixed) {
    const { render } = this.props;
    return render(item);
  }

  render() {
    const { items, itemSpacing = "default" } = this.props;
    const listItemClasses = classNames(
      "o-list-bare__item t-border-bottom t-color-grey-light-2 t-border--current-color",
      createModifierClasses("u-padding-bottom", itemSpacing),
      createModifierClasses("u-margin-bottom", itemSpacing)
    );

    return (
      <ul className="o-list-bare u-margin-bottom--none">
        {items.map((item, i) => (
          <li key={i} className={listItemClasses}>
            <div className="t-color-grey-dark-3">{this.renderItem(item)}</div>
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
