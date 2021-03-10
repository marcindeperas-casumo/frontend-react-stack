import React from "react";
import { useTimeoutFn } from "react-use";
import classNames from "classnames";
import "./BottomNotifications.scss";

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

  React.useEffect(() => {
    setShow(false);
  }, [text]);

  return (
    <div
      className={classNames(
        "t-color-grey-50 u-position-absolute c-game-page-bottom-notification u-width--full u-padding--md t-background-grey-80",
        show && "show"
      )}
    >
      {text}
    </div>
  );
};

export const BottomNotifications = ({
  notifications = [],
}: {
  notifications: Array<string>;
}): React.ReactElement => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const currentMessage = notifications[current];

  return (
    <div className="u-position-fixed o-inset-bottom--none u-width--full">
      {currentMessage && (
        <SingleNotification
          key={current}
          text={currentMessage}
          afterHide={next}
        />
      )}
    </div>
  );
};
