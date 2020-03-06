// @flow
import * as React from "react";

export const FullscreenViewContext = React.createContext<HTMLElement | null>(
  null
);

type Props = {
  children: React.Node,
  className?: string,
};

export const FullscreenView = ({ children, className }: Props) => {
  const ref = React.useRef(null);
  const [refState, setRefState] = React.useState(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    setRefState(ref.current);
  }, []);

  return (
    <div className={className} ref={ref}>
      <FullscreenViewContext.Provider value={refState}>
        {children}
      </FullscreenViewContext.Provider>
    </div>
  );
};
