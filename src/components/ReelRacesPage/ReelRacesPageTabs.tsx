import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import cx from "classnames";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import type {
  TReelRacesContentPage,
  TReelRaceTabs,
} from "./ReelRacesPageContainer";

type Props = {
  t: TReelRacesContentPage | null;
  activeTab: string;
  setActiveTab: (tab: TReelRaceTabs) => void;
};

export function ReelRacesPageTabs({
  t,
  activeTab,
  setActiveTab = () => {},
}: Props) {
  const isNotMobile = useIsScreenMinimumTablet();

  return (
    <div className="bg-grey-0">
      <div className="u-content-width--tablet-landscape u-padding-y--md">
        <Flex
          justify="center"
          spacing="none"
          className={cx(
            "bg-white u-font-weight-bold",
            isNotMobile &&
              "t-border-r-top-left--md t-border-r-top-right--md u-margin-x--md"
          )}
        >
          <Flex.Block
            onClick={() => setActiveTab("SCHEDULE")}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === "SCHEDULE"
                ? "t-border-purple-60 text-purple-60"
                : "t-border-grey-20 text-grey-20 u-cursor--pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.schedule_tab_title}
            </Text>
          </Flex.Block>
          <Flex.Block
            onClick={() => setActiveTab("PREVIOUS")}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === "PREVIOUS"
                ? "t-border-purple-60 text-purple-60"
                : "t-border-grey-20 text-grey-20 u-cursor--pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.previous_winners_tab_title}
            </Text>
          </Flex.Block>
        </Flex>
      </div>
    </div>
  );
}
