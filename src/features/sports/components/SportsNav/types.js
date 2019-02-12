// @flow
import type { Node } from "react";

export type SportsNavItemType = {
  icon?: Node,
  text: Node,
  path: string,
  parentPath?: string,
  subNav?: Array<SportsNavItemType>,
  key: string,
};
