import React from "react";
import { useTimeoutFn } from "react-use";
import classNames from "classnames";

export const SingleNotification = ({
  hideDelay = 5000,
  text = "",
  afterHide = () => {},
}: {
  hideDelay?: number;
  text: string;
  afterHide: () => void;
}) => {
  const [show, setShow] = React.useState(false);

  useTimeoutFn(() => {
    setShow(true);
  }, 20);

  useTimeoutFn(() => {
    setShow(false);
  }, hideDelay);

  useTimeoutFn(() => {
    afterHide();
  }, hideDelay + 1000);

  return (
    <div
      className={classNames(
        "t-color-grey-20 u-font-xs u-text-align-center u-position-absolute c-game-page-bottom-notification u-width--full u-padding t-background-grey-80",
        show && "o-inset-bottom--none"
      )}
    >
      {text}
    </div>
  );
};
