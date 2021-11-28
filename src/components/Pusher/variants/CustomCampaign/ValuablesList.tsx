import React, { ReactChild } from "react";
import Flex from "@casumo/cmp-flex";
import { ValuableCoin } from "Components/ValuableThumbnail";
import DangerousHtml from "Components/DangerousHtml";
import { NavLink } from "Components/NavLink";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import {
  ChristmasValuableEntry,
  REDIRECT_TYPE,
} from "./ValuablesListContainer";
import "./ValuablesList.scss";

type Props = {
  redirectRoute: string;
  onItemClick: (val: ChristmasValuableEntry) => void;
  valuables: ChristmasValuableEntry[];
  loading: boolean;
};

const withPlayerProfileLink = (
  val: ChristmasValuableEntry,
  element: ReactChild,
  redirectRoute: string
) => {
  if (val.__typename === REDIRECT_TYPE) {
    return <NavLink to={redirectRoute}>{element}</NavLink>;
  }

  return <>{element}</>;
};

export const CustomCampaignValuableList = ({
  redirectRoute,
  onItemClick,
  valuables,
  loading,
}: Props) => {
  if (loading) {
    return (
      <div style={{ height: "85px" }}>
        <GameRowSkeleton />
      </div>
    );
  }

  return (
    <>
      {valuables.map(val => (
        <Flex.Item key={val.id}>
          <Flex
            className="u-cursor--pointer u-padding-x--md u-padding-y--sm t-border-bottom border-grey-5"
            onClick={() => onItemClick(val)}
            align="center"
          >
            <Flex.Item>
              {withPlayerProfileLink(
                val,
                <ValuableCoin
                  currency={val.currency}
                  size="large"
                  valuableType={val.valuableType}
                  className="valuable-list__coin"
                  lockIcon={val.lockIcon}
                  valuableBadgeName={val.rule.name}
                />,
                redirectRoute
              )}
            </Flex.Item>
            <Flex.Item className="u-text-align-left u-padding-x--md u-margin-left--none">
              {withPlayerProfileLink(
                val,
                <>
                  <span className="t-color-purple-60 u-font-weight-bold">
                    {val.promoTitle}
                  </span>
                  <div className="text-grey-50">
                    <DangerousHtml html={val.subtitle} />
                  </div>
                </>,
                redirectRoute
              )}
            </Flex.Item>
          </Flex>
        </Flex.Item>
      ))}
    </>
  );
};
