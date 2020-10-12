import React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import {
  Desktop,
  MobileAndTablet,
  isDesktop,
} from "Components/ResponsiveLayout";
import {
  PlayOkayBar,
  ProfileIconWithDrawer,
} from "Components/Compliance/PlayOkayBar";
import { QuickDeposit } from "Components/QuickDeposit";
import { InGameDrawerLinks } from "Components/InGameDrawer/InGameDrawerLinks";

import "./GamePageHeader.scss";

export const GamePageHeader = ({ pauseGame, resumeGame }) => {
  return (
    <div
      className={cx("u-padding--md@desktop", {
        "t-background-black": isDesktop(),
      })}
    >
      <Flex align="center" spacing="none">
        <Flex.Item>
          <ProfileIconWithDrawer />
        </Flex.Item>
        <Flex.Block>
          <Flex
            className="t-background-grey-90 t-border-r@desktop u-padding-y@desktop u-padding-left--lg"
            align="center"
            justify="space-between"
            spacing="none"
          >
            <MobileAndTablet>
              <Flex.Item className="c-gamepage-header-sumoticon-spacer"></Flex.Item>
            </MobileAndTablet>
            <Flex.Item>
              <PlayOkayBar />
            </Flex.Item>
            <Desktop>
              <Flex.Item>
                <QuickDeposit />
              </Flex.Item>
              <Flex.Item>
                <InGameDrawerLinks showLabels={false} />
              </Flex.Item>
            </Desktop>
          </Flex>
        </Flex.Block>
      </Flex>
    </div>
  );
};
