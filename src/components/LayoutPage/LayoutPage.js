// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import Sidebar from "Components/Sidebar";
import { useIsScreenMinimumTablet, useIsSidebarOpen } from "Utils/hooks";
import "./LayoutPage.scss";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  const isMenuOpen = useIsSidebarOpen();
  const isSidebarFixed = useIsScreenMinimumTablet();

  return (
    <Flex
      direction={isSidebarFixed ? "horizontal" : "vertical"}
      className={classNames(
        isMenuOpen && "c-layout--sidebar-open",
        "u-height--full"
      )}
      spacing="none"
    >
      <Sidebar />
      <div className="c-layout-content">{props.children}</div>
    </Flex>
  );
};
