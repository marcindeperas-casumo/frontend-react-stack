import React, { lazy, Suspense } from "react";

const LazyCasinoPageLoader = lazy(() =>
  import("Pages/CasinoPage").then(module => ({
    default: module.CasinoPage,
  }))
);

export const LazyCasinoPage = () => (
  <Suspense fallback={<div>Loading the Casino Page</div>}>
    <LazyCasinoPageLoader />
  </Suspense>
);

const LazySportsPageLoader = lazy(() =>
  import("Pages/SportsPage").then(module => ({
    default: module.SportsPage,
  }))
);

export const LazySportsPage = () => (
  <Suspense fallback={<div>Loading the Sports Page</div>}>
    <LazySportsPageLoader />
  </Suspense>
);

const LazyPlayerPageLoader = lazy(() =>
  import("Pages/PlayerPage").then(module => ({
    default: module.PlayerPage,
  }))
);

export const LazyPlayerPage = () => (
  <Suspense fallback={<div>Loading the Player Page</div>}>
    <LazyPlayerPageLoader />
  </Suspense>
);

const LazyPlayPageLoader = lazy(() =>
  import("Pages/PlayPage").then(module => ({
    default: module.PlayPage,
  }))
);

export const LazyPlayPage = () => (
  <Suspense fallback={<div>Loading the Play Page</div>}>
    <LazyPlayPageLoader />
  </Suspense>
);

const LazyWalletPageLoader = lazy(() =>
  import("Pages/WalletPage").then(module => ({
    default: module.WalletPage,
  }))
);

export const LazyWalletPage = () => (
  <Suspense fallback={<div>Loading the Wallet Page</div>}>
    <LazyWalletPageLoader />
  </Suspense>
);
