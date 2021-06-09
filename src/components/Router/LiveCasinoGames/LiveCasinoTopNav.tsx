import Flex from "@casumo/cmp-flex";
import { PlayIcon, SearchIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { useLocation } from "@reach/router";
import { isTablet, isDesktop } from "Components/ResponsiveLayout";
import { useTranslations, useLanguage, useResize } from "Utils/hooks";
import { routeTranslator } from "Utils";
import { ROUTE_IDS } from "Src/constants";
import { NavLinkItem } from "../GameBrowser/TopNav";

export const LiveCasinoTopNav = (props: { basepath: string | null }) => {
  const t = useTranslations<{
    search: string;
    games: string;
  }>("new-game-browser.top-nav");

  useResize();

  const language = useLanguage();
  const translateRoute = routeTranslator(language);
  const { pathname } = useLocation();

  const buildUrl = (route: string) => {
    if (props.basepath) {
      return `/${props.basepath}/${route}`;
    }

    return `/${route}`;
  };
  const gamesUrl = buildUrl(translateRoute(ROUTE_IDS.LIVE_CASINO));
  const searchUrl = buildUrl(translateRoute(ROUTE_IDS.LIVE_CASINO_SEARCH));
  const searchActive = pathname === searchUrl;
  const gamesActive = !searchActive;

  const routesProps = [
    {
      Icon: PlayIcon,
      text: t?.games,
      to: gamesUrl,
      active: gamesActive,
    },
    {
      Icon: SearchIcon,
      text: t?.search,
      to: searchUrl,
      active: searchActive,
    },
  ];

  // eslint-disable-next-line no-nested-ternary
  const navItemSpacing = isTablet() ? "md" : isDesktop() ? "lg" : "sm";

  return (
    <Flex className="o-wrapper" spacing={navItemSpacing}>
      {routesProps.map(x => (
        <NavLinkItem key={x.to} {...x} />
      ))}
    </Flex>
  );
};
