import { NavLink } from "react-router-dom";
import { linksList } from "../data/Provider";
import useKey from "../utils/useKey";

const Menu = ({ setIsMenuOpen, isMenuOpen, position }) => {
  useKey({
    state: isMenuOpen == true,
    setState: setIsMenuOpen,
    key: "Escape",
    newState: "close",
  });
  return (
    <div className="flex-center fixed left-0 top-0 z-50 h-screen w-screen bg-neutral-950/40 backdrop-blur-lg">
      <ul className="flex max-w-screen-xl flex-col justify-between gap-x-12 gap-y-8 font-monoton text-3xl md:text-4xl lg:flex-row">
        {linksList.map((item) => (
          <li
            key={item.name}
            className="cursor-pointer duration-200 hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "text-blue-500" : null)}
              unstable_viewTransition
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* close button */}
      <span
        className={`absolute top-3.5 size-12 max-w-screen-2xl cursor-pointer rounded-md text-center text-5xl leading-[3rem] hover:bg-gray-500/30 md:top-4 2xl:top-20`}
        onClick={() => setIsMenuOpen(false)}
        style={{ left: position.x, top: position.y }}
      >
        &times;
      </span>
    </div>
  );
};

export default Menu;
