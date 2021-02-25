// @flow
import { useState, useEffect, useRef } from "react";

export const useDropdown = (initialState: boolean = false) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (event: SyntheticEvent<HTMLElement>) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
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
  }, [isOpen, dropdownRef]);

  return {
    isOpen,
    setIsOpen,
  };
};
