import { useEffect } from "react";

/**
 * @param {{state:boolean | string,setState:function,key:string,newState:boolean}}
 * @param state state == true
 */
const useKey = ({ state, setState, key, newState }) => {
  newState = newState === "open" ? true : false;
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPressed);
    return () => {
      document.removeEventListener("keydown", handleKeyPressed);
    };
  }, []);
  function handleKeyPressed(e) {
    if (state && e.code.toLowerCase() === key.toLowerCase()) {
      setState(newState);
    }
  }
};

export default useKey;
