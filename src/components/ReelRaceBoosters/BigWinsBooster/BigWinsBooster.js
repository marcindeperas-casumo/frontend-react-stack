// @flow
import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { FlashingCircle } from "../FlashingCircle";
import { useLocalBigWins } from "./useLocalBigWins";
import "./BigWinsBooster.scss";

type Props = {
  className?: string,
  bigWins: number,
};

const baseClassName = "c-rr-booster--big-wins";

function getArcClassName(isDark: boolean): string {
  return cx(
    `${baseClassName}__arc`,
    isDark ? "t-color-black t-opacity--25" : "t-color-teal-50"
  );
}

export function BigWinsBooster({ className, bigWins }: Props) {
  const { isEven, isDouble } = useLocalBigWins({ bigWins });

  return (
    <div className={cx(baseClassName, className)}>
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <FlashingCircle isTransitioning={isDouble} />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="currentColor"
          className={getArcClassName(isEven)}
          d="M33.5677 5.04469C43.9297 7.55241 51.627 16.9055 51.627 28.0604C51.627 39.2153 43.9297 48.5684 33.5677 51.0761C33.1154 51.1856 32.658 51.282 32.196 51.3649C32.0799 51.3858 31.9666 51.4146 31.8569 51.4508C30.7514 51.8151 30.0046 52.922 30.2403 54.0877C30.4602 55.1751 31.4681 55.9307 32.5629 55.751C32.6992 55.7286 32.8353 55.7052 32.971 55.6809C33.5334 55.5799 34.0899 55.4622 34.6401 55.3281C46.8999 52.341 56.002 41.266 56.002 28.0604C56.002 14.8548 46.8999 3.7798 34.6401 0.792674C34.0899 0.658616 33.5334 0.540846 32.971 0.439906C32.8353 0.41555 32.6992 0.392175 32.5629 0.369786C31.4681 0.190053 30.4602 0.945707 30.2403 2.03309C30.0046 3.19879 30.7514 4.30569 31.8569 4.67001C31.9666 4.70617 32.0799 4.73501 32.196 4.75587C32.658 4.83882 33.1154 4.93524 33.5677 5.04469Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="currentColor"
          className={getArcClassName(!isDouble)}
          d="M21.3618 55.207C9.10204 52.2199 -5.14984e-05 41.1449 -5.14984e-05 27.9393C-5.14984e-05 14.7337 9.10204 3.6587 21.3618 0.67158C21.912 0.537522 22.4686 0.419752 23.031 0.318812C23.1667 0.294457 23.3027 0.271081 23.4391 0.248693C24.5338 0.0689591 25.5417 0.824613 25.7616 1.912C25.9973 3.07769 25.2506 4.18459 24.1451 4.54891C24.0354 4.58507 23.9221 4.61392 23.8059 4.63478C23.3439 4.71773 22.8866 4.81414 22.4343 4.9236C12.0723 7.43132 4.37495 16.7844 4.37495 27.9393C4.37495 39.0942 12.0723 48.4473 22.4343 50.955C22.8866 51.0645 23.3439 51.1609 23.8059 51.2438C23.9221 51.2647 24.0354 51.2935 24.1451 51.3297C25.2506 51.694 25.9973 52.8009 25.7616 53.9666C25.5417 55.054 24.5338 55.8096 23.4391 55.6299C23.3027 55.6075 23.1667 55.5842 23.031 55.5598C22.4686 55.4589 21.912 55.3411 21.3618 55.207Z"
        />
        <path
          d="M21.6752 29.8176L22.2686 33.1234C22.3286 33.4599 22.1619 33.7172 21.7886 33.7832L19.7085 34.1461C19.4351 34.1923 19.1751 34.0142 19.1284 33.7436L18.3684 29.4613C18.3217 29.1907 18.5017 28.9334 18.7751 28.8872L20.4885 28.5903C20.5752 28.5771 20.6685 28.5771 20.7552 28.6101L21.6752 29.8176ZM40.7095 24.0243C41.0162 22.2758 39.3228 20.7186 37.556 20.415L37.4894 20.4018C35.7226 20.0983 34.0425 21.2596 33.7292 23.0082L32.0824 32.1535C31.7691 33.9021 32.9491 35.5649 34.7159 35.875L34.7826 35.8882C36.5427 36.1918 38.6028 35.7101 38.9161 33.9615L39.9028 28.6696C39.9495 28.3991 39.7695 28.1417 39.4961 28.0955L36.6293 27.5347C36.356 27.4885 36.096 27.6667 36.0493 27.9372L35.856 29.0919C35.8093 29.3624 35.9893 29.6198 36.2626 29.666L37.1894 29.8309C37.4627 29.8771 37.6427 30.1344 37.596 30.405L37.0627 33.4072C37.0227 33.6316 36.8427 34.4036 35.8693 34.232L35.3093 34.1331C34.4759 33.9879 33.9225 33.2027 34.0692 32.3779L35.6426 23.5493C35.7893 22.7245 36.5827 22.1768 37.416 22.322L37.4827 22.3352C38.3161 22.4803 38.8694 23.2655 38.7228 24.0903L38.4828 25.4562C38.4361 25.7267 38.6161 25.9841 38.8894 26.0303L39.7962 26.1688C40.0695 26.215 40.3295 26.0369 40.3762 25.7663L40.7095 24.0243ZM31.2291 28.1087L31.2491 28.0164L31.2091 28.1087H31.2291ZM30.469 20.0983C30.5757 19.7816 30.3357 19.4517 29.9957 19.4517H27.1155C26.8622 19.4517 26.6488 19.6364 26.6155 19.8872L26.2555 22.7179C26.2221 23.0082 26.4555 23.2721 26.7555 23.2721H29.0689C29.2823 23.2721 29.4756 23.1336 29.5423 22.929L30.469 20.0983ZM30.229 25.8587C30.369 25.5288 30.1223 25.1725 29.769 25.1725H26.1088C25.9688 25.1725 25.8754 25.2714 25.8421 25.3902C25.7954 25.5684 25.7288 25.8059 25.7088 25.8785C25.6754 25.9973 25.7621 26.1358 25.9221 26.1358H26.6422C26.9288 26.1358 27.0222 26.2942 26.9822 26.5515C26.8355 27.5017 26.4688 29.7979 26.4088 30.1542C26.3355 30.6095 26.4621 30.9131 26.7622 30.9131H27.3355C27.5289 30.9131 27.6755 31.1044 27.6355 31.3222C27.6022 31.5069 27.1155 35.1228 26.9622 36.2841C26.9355 36.5085 26.9955 36.647 27.1155 36.6404H27.5222C27.6355 36.6404 27.7555 36.5679 27.8022 36.4359C27.8422 36.3039 30.0823 30.6293 30.0823 30.6293C30.209 30.306 29.969 29.9563 29.6156 29.9563L29.269 29.9497C28.9156 29.9497 28.6756 29.5868 28.8089 29.2635L30.229 25.8587ZM24.9221 28.3661L24.9287 28.3595H24.9221V28.3661ZM21.8752 35.7167C23.382 35.4527 24.482 33.724 24.2087 32.2261L23.7087 29.4086C23.5753 28.6432 22.902 28.056 22.2486 27.7194C21.9753 27.5809 21.9086 27.2246 22.1019 26.987C22.5286 26.4525 22.8153 25.7267 22.6886 25.0207L22.3019 22.8366C22.0353 21.3454 20.7019 20.1247 19.1884 20.3886L15.4283 20.9561C15.1549 21.0023 14.9749 21.2596 15.0216 21.5302L17.4884 36.007C17.535 36.2775 17.795 36.4557 18.0684 36.4095L21.8752 35.7167ZM38.0961 18.8776C40.8562 19.3593 42.703 21.9657 42.2163 24.6974L40.5495 34.0143C40.1162 36.4689 37.736 38.1251 35.2493 37.6896L34.1959 37.518C32.8291 37.2805 31.7091 36.4689 31.0557 35.3736C30.849 35.0238 30.3157 35.0766 30.169 35.4593L29.1023 38.2306C29.0289 38.422 28.8423 38.5474 28.6356 38.5474H25.3754C25.0687 38.5474 24.8354 38.2768 24.8821 37.9799L25.0421 36.911C25.1087 36.4623 24.6021 36.1786 24.242 36.4491C23.722 36.8318 23.1086 37.1023 22.4219 37.2211L16.8283 38.1911C16.555 38.2372 16.295 38.0591 16.2483 37.7886L13.1348 20.3227C13.0881 20.0521 13.2681 19.7948 13.5415 19.7486L19.0018 18.7654C21.2419 18.3761 23.382 19.8014 23.7753 22.0118L24.1487 23.9848L25.0287 17.9604C25.0621 17.7163 25.2754 17.5381 25.5221 17.5381H32.6558C32.9958 17.5381 33.2358 17.8681 33.1292 18.1914L31.3957 23.2655H32.1358L32.2358 22.5793C32.6691 20.1247 35.0492 18.3431 37.536 18.7786L38.0961 18.8776ZM20.1952 26.9078L20.4485 26.7891C20.8085 26.4526 20.8152 25.8323 20.7485 25.4562L20.2618 22.7443C20.2085 22.4473 19.9685 22.2032 19.6151 22.2626L17.6484 22.6057C17.375 22.6519 17.195 22.9092 17.2417 23.1798L17.8884 26.8089C17.935 27.0794 18.1951 27.2576 18.4684 27.2114L20.1952 26.9078Z"
          fill="white"
        />
      </svg>
      <Text
        className={cx(
          `${baseClassName}__points`,
          isDouble
            ? `t-color-white ${baseClassName}__points--doubled`
            : "t-color-grey-50",
          "u-text-align-center u-font-weight-bold"
        )}
      >
        +35
      </Text>
    </div>
  );
}
