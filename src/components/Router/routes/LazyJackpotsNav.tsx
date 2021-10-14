import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyJackpotsNav = props => {
  const augmentedProps = {
    ...props,
    jackpotSlug: props.slug,
  };
  return (
    <LazyPortal
      hostElementId="react-host-top-nav"
      loader={() => import("Components/Router/Jackpots/JackpotsTopNav")}
      namedExport="JackpotsTopNav"
      props={augmentedProps}
    />
  );
};
