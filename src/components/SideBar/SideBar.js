// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import "./SideBar.scss";
import { CasumoLogo, IconProfile, IconWallet, IconCherry } from "./icons";
import { SideBarRow } from "./SideBarRow";
import type { SideBarMenuRow, SideBarWallet } from "./types";

type Props = {
  username: string,
  wallet: SideBarWallet,
  menu: Array<SideBarMenuRow>,
  fetchMenuPage?: () => void,
  fetchPaymentsPage?: () => void,
};

export class SideBar extends PureComponent<Props> {
  componentDidMount() {
    if (this.props.fetchMenuPage) {
      this.props.fetchMenuPage();
    }
    if (this.props.fetchPaymentsPage) {
      this.props.fetchPaymentsPage();
    }
  }

  render() {
    return (
      <div className="t-color-white u-font-weight-bold">
        <ul className="c-sidebar-nav u-margin--none u-padding--none u-font">
          <li className="u-padding--lg t-background-plum">
            <Flex align="center" justify="center" className="u-height--full">
              <a href="/">
                <CasumoLogo
                  className="t-color-turquoise"
                  data-test-id="sidebar-logo"
                />
              </a>
            </Flex>
          </li>
          <SideBarRow text={this.props.username} Icon={IconProfile} link="" />
          <SideBarRow
            text={this.props.wallet.cash}
            label={this.props.wallet.bonus}
            Icon={IconWallet}
          />
          <SideBarRow text="Game Browser" Icon={IconCherry} isSelected={true} />
          {this.props.menu.map(row => (
            <SideBarRow
              text={row.name}
              isWhiteRow={true}
              link={row.link}
              action={row.action}
              key={row.name}
            />
          ))}
        </ul>
      </div>
    );
  }
}
