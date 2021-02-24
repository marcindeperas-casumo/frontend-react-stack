// @flow
import { useState, useEffect, useRef } from "react";

const INITIAL_STATE = false;

export const useDropdown = (initialState = INITIAL_STATE) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(initialState);

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
