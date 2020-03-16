// @flow
import React from "react";
import "./LayoutPage.scss";
import Flex from "@casumo/cmp-flex";
import { isMobile } from "@casumo/fe-toolkit-ismobile";
import classNames from "classnames";
import { FullscreenView } from "Components/FullscreenView";
import Sidebar from "Components/Sidebar";
import { isNativeByUserAgent } from "GameProviders";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  const isNative = isNativeByUserAgent();
  const isSidebarVisible = !isMobile(window);

  return (
    <FullscreenView
      className={classNames(
        isNative ? "u-height--screen" : "u-height--full",
        "u-width--screen t-background-chrome-dark-3"
      )}
    >
      <Flex
        direction="horizontal"
        className={classNames(
          isSidebarVisible && "c-layout--sidebar-open",
          "u-height--full"
        )}
        spacing="none"
      >
        {isSidebarVisible && <Sidebar />}
        <div className="c-layout-content t-background-chrome-dark-3">
          {props.children}
        </div>
      </Flex>
    </FullscreenView>
  );
};
