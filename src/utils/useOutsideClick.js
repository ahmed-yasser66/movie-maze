import { useEffect, useRef } from "react";

/**
 * @example
 * useOutsideClick({
 *  state: isOpen,
 *  setState:setIsOpen
 * })
 * @returns ref
 * @example
 * <div ref={ref}>....</div>
 */
const useOutsideClick = ({ state, setState }) => {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && state && !ref.current.contains(e.target)) {
        setState(false);
      }
    }
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [state, setState]);

  return ref;
};

export default useOutsideClick;
