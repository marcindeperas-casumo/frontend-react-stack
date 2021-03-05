import * as React from "react";
import cx from "classnames";
import { useIsTransitioning } from "Utils/hooks/useIsTransitioning";
import { FlashingCircle } from "../FlashingCircle";
import { Points } from "../Points";
import { getArcClassName } from "../ReelRaceBoosters.utils";
import "../ReelRaceBooster.scss";

type Props = {
  className?: string;
  winsInARow: number;
};

const baseClassName = "c-rr-booster";
const baseModClassName = `${baseClassName}--wins-in-a-row`;
let cmpId = 0; // eslint-disable-line fp/no-let

function getCmpId() {
  return cmpId++; // eslint-disable-line fp/no-mutation
}

export function WinsInARowBooster({ className, winsInARow }: Props) {
  const isDouble = winsInARow === 2;
  const isTriple = winsInARow === 3;
  const instanceId = getCmpId();
  const enterPredicate = () => isTriple;
  const { isTransitioning } = useIsTransitioning({
    enterPredicate,
    tweenedValue: winsInARow,
    duration: 1500,
  });

  return (
    <div className={cx(baseClassName, baseModClassName, className)}>
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <FlashingCircle isTransitioning={isTransitioning} />
        <mask id={`mask-${instanceId}-0`} fill="white">
          <path d="M51.8304 29.0844C52.668 17.0147 44.1983 6.45501 32.5778 4.54161C31.4056 4.3486 30.5079 3.33062 30.5901 2.14563C30.6723 0.96063 31.7036 0.0590639 32.8784 0.234971C46.8523 2.32725 57.0913 14.944 56.0892 29.3845C55.8598 32.6897 55.0605 35.8177 53.7947 38.6779C53.2819 39.8366 51.8419 40.1797 50.7912 39.4696C49.8785 38.8527 49.5873 37.6512 50.0191 36.6387C51.015 34.3038 51.6445 31.7631 51.8304 29.0844Z" />
        </mask>
        <path
          fill="currentColor"
          className={getArcClassName(
            isTransitioning || winsInARow === 1 || isDouble
          )}
          mask={`url(#mask-${instanceId}-0)`}
          d="M32.5778 4.54161L33.3849 -0.39232L32.5778 4.54161ZM32.8784 0.234971L33.6136 -4.71027L32.8784 0.234971ZM50.0191 36.6387L45.4201 34.6727L50.0191 36.6387ZM53.7947 38.6779L49.2225 36.6499L49.2225 36.6499L53.7947 38.6779ZM50.7912 39.4696L47.9949 43.6118L47.9949 43.6118L50.7912 39.4696ZM31.7707 9.47553C40.8368 10.9683 47.5021 19.2322 46.8428 28.733L56.8181 29.4359C57.834 14.7972 47.5598 1.94168 33.3849 -0.39232L31.7707 9.47553ZM32.1433 5.18021C43.5251 6.88439 51.9238 17.1852 51.1016 29.0331L61.0768 29.7359C62.2589 12.7029 50.1795 -2.2299 33.6136 -4.71027L32.1433 5.18021ZM46.8428 28.733C46.696 30.8484 46.2001 32.8439 45.4201 34.6727L54.6182 38.6047C55.8299 35.7636 56.5931 32.6778 56.8181 29.4359L46.8428 28.733ZM51.1016 29.0331C50.9129 31.7516 50.2568 34.3129 49.2225 36.6499L58.3668 40.7058C59.8641 37.3225 60.8068 33.6278 61.0768 29.7359L51.1016 29.0331ZM49.2225 36.6499C50.0913 34.687 52.3131 34.4661 53.5875 35.3274L47.9949 43.6118C51.3708 45.8933 56.4725 44.9862 58.3668 40.7058L49.2225 36.6499ZM45.4201 34.6727C44.1492 37.6525 44.8903 41.5136 47.9949 43.6118L53.5875 35.3274C54.8667 36.1919 55.0254 37.6499 54.6182 38.6047L45.4201 34.6727ZM33.6136 -4.71027C29.3017 -5.35589 25.8684 -2.03742 25.6025 1.7942L35.5777 2.49706C35.4763 3.95868 34.1055 5.47401 32.1433 5.18021L33.6136 -4.71027ZM33.3849 -0.39232C34.4659 -0.214329 35.6942 0.81908 35.5777 2.49706L25.6025 1.7942C25.3216 5.84217 28.3453 8.91153 31.7707 9.47553L33.3849 -0.39232Z"
        />
        <mask id={`mask-${instanceId}-1`} fill="white">
          <path d="M5.16468 29.0844C4.32707 17.0147 12.7968 6.45501 24.4173 4.54161C25.5895 4.3486 26.4872 3.33062 26.405 2.14563C26.3228 0.96063 25.2915 0.0590639 24.1167 0.234971C10.1428 2.32725 -0.0962239 14.944 0.905908 29.3845C1.13528 32.6897 1.93464 35.8177 3.20043 38.6779C3.71324 39.8366 5.15321 40.1797 6.20391 39.4696C7.11664 38.8527 7.40782 37.6512 6.97598 36.6387C5.98014 34.3038 5.35057 31.7631 5.16468 29.0844Z" />
        </mask>
        <path
          fill="currentColor"
          className={getArcClassName(isTransitioning)}
          mask={`url(#mask-${instanceId}-1)`}
          d="M24.4173 4.54161L23.6102 -0.39232L24.4173 4.54161ZM24.1167 0.234971L23.3815 -4.71027L24.1167 0.234971ZM6.97598 36.6387L11.575 34.6727L6.97598 36.6387ZM3.20043 38.6779L7.77257 36.6499L7.77257 36.6499L3.20043 38.6779ZM6.20391 39.4696L9.00018 43.6118L9.00018 43.6118L6.20391 39.4696ZM25.2245 9.47553C16.1583 10.9683 9.49298 19.2322 10.1523 28.733L0.177045 29.4359C-0.838839 14.7972 9.43532 1.94168 23.6102 -0.39232L25.2245 9.47553ZM24.8518 5.18021C13.47 6.88439 5.07133 17.1852 5.89354 29.0331L-4.08173 29.7359C-5.26378 12.7029 6.81559 -2.2299 23.3815 -4.71027L24.8518 5.18021ZM10.1523 28.733C10.2991 30.8484 10.795 32.8439 11.575 34.6727L2.37693 38.6047C1.16525 35.7636 0.402025 32.6778 0.177045 29.4359L10.1523 28.733ZM5.89354 29.0331C6.0822 31.7516 6.7383 34.3129 7.77257 36.6499L-1.37171 40.7058C-2.86902 37.3225 -3.81164 33.6278 -4.08173 29.7359L5.89354 29.0331ZM7.77257 36.6499C6.90383 34.687 4.68207 34.4661 3.40764 35.3274L9.00018 43.6118C5.62436 45.8933 0.522656 44.9862 -1.37171 40.7058L7.77257 36.6499ZM11.575 34.6727C12.8459 37.6525 12.1048 41.5136 9.00018 43.6118L3.40764 35.3274C2.12845 36.1919 1.96973 37.6499 2.37693 38.6047L11.575 34.6727ZM23.3815 -4.71027C27.6934 -5.35589 31.1267 -2.03742 31.3926 1.7942L21.4174 2.49706C21.5188 3.95868 22.8896 5.47401 24.8518 5.18021L23.3815 -4.71027ZM23.6102 -0.39232C22.5292 -0.214329 21.3009 0.81908 21.4174 2.49706L31.3926 1.7942C31.6736 5.84217 28.6498 8.91153 25.2245 9.47553L23.6102 -0.39232Z"
        />
        <path
          fill="currentColor"
          className={getArcClassName(isTransitioning || isDouble)}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M45.3864 43.6066C45.736 43.2248 46.0748 42.829 46.402 42.4193C46.471 42.333 46.545 42.2523 46.6234 42.1775C47.3825 41.4533 48.5474 41.2831 49.4373 41.879C50.4192 42.5364 50.6932 43.8767 49.9694 44.8099C49.89 44.9123 49.81 45.0139 49.7294 45.1149C49.3412 45.6011 48.9392 46.071 48.5244 46.5243C39.5825 56.2947 24.6737 58.3535 13.3371 50.7632C11.2502 49.366 9.41555 47.7296 7.84519 45.9141C7.44238 45.4484 7.05696 44.9709 6.68912 44.4826C6.6084 44.3755 6.52851 44.2678 6.44948 44.1596C5.70179 43.1361 6.1095 41.7148 7.23569 41.1479C8.1246 40.7004 9.18081 40.9342 9.87286 41.6305C9.95172 41.7099 10.0259 41.7952 10.0945 41.8863C10.4038 42.2967 10.7279 42.698 11.0666 43.0895C12.3915 44.6211 13.9392 46.0016 15.6998 47.1803C25.264 53.5839 37.8414 51.8479 45.3864 43.6066Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.9635 29.1447H29.4952H29.3949C29.2615 29.2092 29.1416 29.2965 29.0411 29.401C28.9139 29.5331 28.8177 29.6928 28.7646 29.8684C28.7342 29.9689 28.7179 30.0746 28.7179 30.1834C28.7179 30.1947 28.718 30.2059 28.7184 30.2171C28.7376 30.8359 29.2836 31.346 29.9359 31.346H30.406H30.6872H31.155C31.3198 31.346 31.4779 31.3786 31.6224 31.4373C32.06 31.615 32.373 32.0321 32.373 32.5087C32.373 32.9332 32.1253 33.3103 31.7626 33.5136C31.5829 33.6143 31.375 33.6723 31.155 33.6723H30.6874H29.9359C29.5585 33.6723 29.1943 33.6167 28.8518 33.5136C27.7821 33.1916 26.9244 32.4065 26.5385 31.4064C26.3953 31.0353 26.3171 30.6347 26.3171 30.2171L26.3173 30.1834C26.3211 29.8369 26.3838 29.4904 26.5054 29.1447H24.9225L24.6641 29.1741C24.179 29.2294 23.7287 29.3754 23.3278 29.5926L22.5796 29.9979C21.9015 30.6261 21.4792 31.5047 21.4792 32.4749C21.4792 34.3796 23.1036 35.9301 25.0991 35.9301H28.5323H29.9359H31.155H32.2328H32.3367C34.3311 35.9301 35.9565 34.3796 35.9565 32.4749C35.9565 31.4369 35.4732 30.5038 34.7103 29.8699L33.915 29.4981C33.4622 29.2864 32.958 29.1624 32.4159 29.1511L31.9635 29.1416V29.1447ZM37.2197 28.9692C37.9736 29.9407 38.4248 31.1494 38.4248 32.4749C38.4248 35.7721 35.6344 38.3467 32.3367 38.3467H25.0991C21.7999 38.3467 19.0109 35.7717 19.0109 32.4749C19.0109 31.2997 19.3656 30.2163 19.9715 29.3086L19.7067 27.9224L18.6585 22.4358C18.4207 21.4012 18.7207 20.3916 19.2672 19.6611L24.3302 18.8247C24.4591 18.9125 24.5784 19.0055 24.6886 19.1027C25.0788 17.494 26.5859 16.3467 28.2772 16.3467C29.891 16.3467 31.337 17.3912 31.8051 18.8845C32.6054 17.8521 33.9486 17.3067 35.2877 17.4949C36.4001 17.6316 37.2215 18.2452 37.7266 18.9222C38.3086 19.7008 38.5386 20.6485 38.3522 21.6384L37.419 27.6788L37.2197 28.9692ZM34.9971 27.1968C34.2326 26.8373 33.3825 26.628 32.4924 26.6061L32.9113 24.3358L33.1053 23.284L33.4948 21.1728L33.5491 20.8784L33.5557 20.8425C33.5607 20.814 33.5667 20.7859 33.5737 20.7583C33.7224 20.1707 34.3245 19.7897 34.9588 19.8902C35.2903 19.9249 35.5501 20.1015 35.7341 20.3485C35.9191 20.5955 35.9929 20.8772 35.9191 21.2294L35.9181 21.2354L35.9144 21.2596L35.8563 21.636L35.5406 23.6795L35.3594 24.8523L34.9971 27.1968ZM24.3302 18.8247C23.5619 18.3002 22.5241 18.0361 21.4806 18.2761C20.7203 18.443 19.8833 18.838 19.2683 19.6596L24.3302 18.8247ZM29.435 26.6379C29.455 26.6352 29.4751 26.6326 29.4952 26.6303V24.3116V20.219V19.9259C29.4952 19.292 28.9413 18.7632 28.2772 18.7632C27.6131 18.7632 27.0591 19.292 27.0591 19.9259V20.219V24.3116V26.6042H27.5673V26.6379H29.435ZM21.0979 22.0607L21.1746 22.4624L21.6621 25.0141L22.0773 27.1871L22.1109 27.363C22.7925 26.9916 23.5525 26.7437 24.3552 26.6482L23.9328 24.3932L23.484 21.9975L23.3997 21.5478C23.3968 21.5353 23.3938 21.5228 23.3906 21.5105C23.377 21.4573 23.3613 21.4061 23.3431 21.357C23.259 21.1297 23.124 20.9465 22.9196 20.8078C22.6619 20.6312 22.3293 20.5598 22.0341 20.6312C21.7016 20.7017 21.4428 20.8425 21.2588 21.0885C21.0738 21.3355 20.999 21.653 21.0738 21.9347L21.0795 21.9645L21.0979 22.0607Z"
          fill="white"
        />
      </svg>
      <Points points={5} isTransitioning={isTransitioning} />
    </div>
  );
}
