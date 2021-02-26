// @flow
import * as React from "react";

export const useDropdown = (
  initialState: boolean = false,
  ref: React.Ref<any>
) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialState);

  React.useEffect(() => {
    const onClick = (event: SyntheticEvent<HTMLElement>) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      setIsOpen(!isOpen);
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, ref]);

  return {
    isOpen,
    setIsOpen,
  };
};
