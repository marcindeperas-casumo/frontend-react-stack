// @flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../../../node_modules/@types/react"... Remove this comment to see the full error message
import type { Node } from "react";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../SportsIcon"' has no exported member 'P... Remove this comment to see the full error message
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
