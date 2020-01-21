// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import Sidebar from "Components/Sidebar";
import { useIsSidebarFixed } from "Components/Sidebar/useIsSidebarFixed";
import { useIsMenuOpen } from "Utils/hooks/useIsMenuOpen";
import "./LayoutPage.scss";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  const isMenuOpen = useIsMenuOpen();
  const isSidebarFixed = useIsSidebarFixed();

  return (
    <Flex
      direction={isSidebarFixed ? "horizontal" : "vertical"}
      className={classNames(
        isMenuOpen && "c-layout--menu-open",
        "u-height--full"
      )}
      spacing="none"
    >
      <Sidebar />
      <div className="c-layout-content">{props.children}</div>
    </Flex>
  );
};
