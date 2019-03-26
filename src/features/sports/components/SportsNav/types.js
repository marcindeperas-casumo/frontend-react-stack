// @flow
import type { Node } from "react";
import type { Props as SportsIconProps } from "Features/sports/components/SportsIcon";

export type SportsNavItemType = {
  iconProps?: SportsIconProps,
  text: Node,
  path: string,
  parentPath?: string,
  subNav?: Array<SportsNavItemType>,
  key: string,
  canEdit: boolean,
};
