// @flow
import React from "react";
import "./LayoutPage.scss";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { FullscreenView } from "Components/FullscreenView";
import Sidebar from "Components/Sidebar";
import { useIsScreenMinimumTablet, useIsSidebarOpen } from "Utils/hooks";
import { isNativeByUserAgent } from "GameProviders";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  const isSidebarOpen = useIsSidebarOpen();
  const isSidebarFixed = useIsScreenMinimumTablet();
  const isNative = isNativeByUserAgent();

  return (
    <FullscreenView
      className={classNames(
        isNative ? "u-height--screen" : "u-height--full",
        "u-width--screen t-background-chrome-dark-3"
      )}
    >
      <Flex
        direction={isSidebarFixed ? "horizontal" : "vertical"}
        className={classNames(
          isSidebarOpen && "c-layout--sidebar-open",
          "u-height--full"
        )}
        spacing="none"
      >
        <Sidebar />
        <div className="c-layout-content t-background-chrome-dark-3">
          {props.children}
        </div>
      </Flex>
    </FullscreenView>
  );
};
