import { useEffect, useRef, useState } from "react";
import { MenuIcon, SearchIcon } from "../data/icons";
import { Link } from "react-router-dom";
import SearchScreen from "./SearchScreen";
import Menu from "./Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  let menuButton = useRef();
  const logoRef = useRef();

  useEffect(() => {
    const openSearch = (e) => {
      if (e.code === "KeyK" && e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", openSearch);

    return () => {
      document.removeEventListener("keydown", openSearch);
    };
  }, []);

  return (
    <nav>
      <div className="nav-wrapper relative mx-auto flex max-w-7xl items-center justify-between gap-x-2 p-4 md:px-12 2xl:px-0">
        <div className="flex items-center gap-x-2 lg:gap-x-4" ref={logoRef}>
          {/* navbar button */}
          <i
            className={
              "z-[9] block cursor-pointer rounded-md p-2 hover:bg-gray-500/30"
            }
            ref={menuButton}
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon width={28} height={28} className="size-6 md:size-8" />
          </i>
          {/* logo */}
          <Link
            to={"/"}
            className="mt-0.5 flex cursor-pointer select-none items-center font-monoton text-2xl font-medium text-blue-500 md:text-4xl"
            unstable_viewTransition
          >
            MovieMaze
            <span className="font-poppins text-sm font-semibold">.HD</span>
          </Link>
        </div>

        {/* search */}
        <div
          className="mt-1.5 hidden h-10 items-center rounded-2xl bg-primary px-4 md:flex"
          onClick={() => setIsSearchOpen(true)}
        >
          <input
            type="search"
            placeholder="Search..."
            className="h-full border-none bg-transparent outline-none"
          />
          <kbd className="font-poppins text-sm font-semibold">
            <abbr title="control" className="text-[#A9A9A9]/90 no-underline">
              Ctrl K
            </abbr>
          </kbd>
        </div>
        <i
          className="mt-1 cursor-pointer select-none rounded-full bg-gray-500/30 p-2 md:hidden"
          onClick={() => setIsSearchOpen(true)}
        >
          <SearchIcon width={22} height={22} />
        </i>
      </div>
      {/* menu */}
      {isMenuOpen && (
        <Menu
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          position={{
            x: menuButton.current.getBoundingClientRect().left,
            y: menuButton.current.getBoundingClientRect().top,
          }}
        />
      )}
      {/* search screen */}
      {isSearchOpen && (
        <SearchScreen
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}
    </nav>
  );
};
export default Navbar;
