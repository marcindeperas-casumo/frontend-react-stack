import * as React from "react";

export const useDropdown = (
  initialState: boolean = false,
  ref: React.ElementRef<any>
) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialState);

  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
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
  }, [isOpen, ref, setIsOpen]);

  return {
    isOpen,
    setIsOpen,
  };
};
