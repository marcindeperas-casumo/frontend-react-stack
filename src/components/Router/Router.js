// @flow
import React, { PureComponent } from "react";
import type { Node } from "react";
import { contains, intersection } from "ramda";

type Props = {
  activePaths: string[],
  children: any,
};

export class Router extends PureComponent<Props> {
  render() {
    return React.Children.toArray(this.props.children)
      .filter(React.isValidElement)
      .map<Node>(child => {
        const { activePaths } = this.props;
        const {
          props: { path },
        } = child;

        if (path === "*") {
          return child;
        }

        if (Array.isArray(path)) {
          const intersectionKeys = intersection(path, activePaths);
          return intersectionKeys.length > 0 ? child : null;
        }

        return contains(path, activePaths) ? child : null;
      });
  }
}
