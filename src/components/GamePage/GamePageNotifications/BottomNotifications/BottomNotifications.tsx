import React from "react";
import { SingleNotification } from "./SingleNotification";
import "./BottomNotifications.scss";

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
    <div className="o-position--fixed o-inset-bottom--none u-width--full">
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
