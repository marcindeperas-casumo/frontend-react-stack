// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import "./SideBar.scss";
import { CasumoLogo, IconProfile, IconWallet, IconCasino } from "./icons";
import { SideBarRow } from "./SideBarRow";
import type { SideBarMenuRow, SideBarWallet } from "./types";

type Props = {
  username: string,
  wallet: SideBarWallet,
  menu: Array<SideBarMenuRow>,
};

export class SideBar extends PureComponent<Props> {
  render() {
    return (
      <div className="t-color-white u-font-weight-bold">
        <ul className="c-sidebar-nav u-margin--none u-padding--none u-font">
          <li className="u-padding--lg t-background-plum">
            <Flex align="center" justify="center" className="u-height--full">
              <a href="/">
                <CasumoLogo className="c-sidebar-logo" />
              </a>
            </Flex>
          </li>
          <SideBarRow
            text={this.props.username}
            smallText=""
            Icon={IconProfile}
            cssClasses={[]}
            link=""
          />
          <SideBarRow
            text={this.props.wallet.cash}
            smallText={this.props.wallet.bonus}
            Icon={IconWallet}
            cssClasses={[]}
            link=""
          />
          <SideBarRow
            text="Game Browser"
            smallText=""
            Icon={IconCasino}
            cssClasses={[`selected`]}
            link=""
          />
          {this.props.menu.map(row => (
            <SideBarRow
              text={row.name}
              smallText=""
              Icon=""
              cssClasses={[`white`]}
              link={row.link}
              key={row.name}
            />
          ))}
        </ul>
      </div>
    );
  }
}
