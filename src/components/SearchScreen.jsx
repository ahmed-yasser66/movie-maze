import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
// assets
import { SearchIcon } from "../data/icons";
import { options } from "../utils/useFetch";
import Imdb from "../data/imdb.webp";
import useKey from "../utils/useKey";
import useOutsideClick from "../utils/useOutsideClick";

const baseUrl = process.env.REACT_APP_BASE_URL;
const imageUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const SearchScreen = ({ isSearchOpen, setIsSearchOpen }) => {
  const searchbox = useRef(),
    searchRef = useOutsideClick({
      state: isSearchOpen,
      setState: setIsSearchOpen,
    });

  // custom hook to escape search window
  useKey({
    state: isSearchOpen === true,
    setState: setIsSearchOpen,
    key: "Escape",
    newState: "close",
  });

  useEffect(() => {
    searchbox.current.focus();
  }, []);

  const [pending, setPending] = useState(false);
  const [data, setData] = useState([]);

  const controllerRef = useRef();
  const handleChange = useCallback(async (e) => {
    const searchTerm = e.target.value;
    if (controllerRef.current) controllerRef.current.abort();
    if (!searchTerm) return setData([]);

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    setPending(true);
    try {
      const resp = await fetch(`${baseUrl}/search/multi?query=${searchTerm}`, {
        ...options,
        signal,
        cache: "no-cache",
      });
      const data = await resp.json();
      const filteredData = data?.results?.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv",
      );
      setData(filteredData);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  });

  const searchResults =
    data.length > 0
      ? data.slice(0, 8).map((movie) => {
          if (!movie.poster_path && !movie.backdrop_path) {
            return;
          }
          return (
            <Link
              to={movie.title ? `/movie/${movie.id}` : `/tv/${movie.id}`}
              className="flex cursor-pointer items-center gap-x-7 rounded-md bg-neutral-800  p-2.5 duration-300 hover:bg-neutral-600"
              key={movie.id + "keyid"}
              onClick={() => setIsSearchOpen(false)}
            >
              <LazyLoadImage
                src={`${imageUrl}/w154${movie.poster_path || movie.backdrop_path}`}
                alt={movie.title || movie.name}
                width={80}
                height={80}
                className="aspect-[2/3] rounded-sm"
              />
              <p className="space-y-4">
                <span className="font-medium md:text-lg md:font-medium">
                  {movie.title || movie.name}
                </span>
                <span className="flex gap-x-2 text-xs font-semibold text-neutral-300 md:text-sm">
                  {movie.vote_average?.toFixed(1)}{" "}
                  <img src={Imdb} alt="imdb" width={30} height={20} />
                </span>
              </p>
            </Link>
          );
        })
      : null;

  return (
    <div className="flex-center fixed left-0 top-0 z-50 size-full flex-col bg-neutral-950/40 backdrop-blur-lg">
      <div
        className="wrapper flex-center h-fit w-[90vw] flex-col md:w-[80vw]"
        ref={searchRef}
      >
        <form className="search--wrapper relative h-14 w-full max-w-6xl">
          <input
            type="text"
            className="size-full rounded-md border-none bg-primary px-14 text-lg font-medium outline-none placeholder:text-sm"
            placeholder="Search for something to watch...."
            onChange={handleChange}
            ref={searchbox}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon width={20} height={20} />
          </span>
          {/* close button */}
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer select-none rounded-md bg-gray-500/60 px-1.5 py-2 text-[10px] text-seconadry/70"
            onClick={() => setIsSearchOpen(false)}
          >
            ESC
          </span>
        </form>
        <div className="search--results relative mt-4 flex h-14 max-h-[60vh] min-h-[65vh] w-full max-w-6xl flex-col gap-y-4 overflow-y-auto rounded-md bg-primary p-2 px-4 md:p-6">
          {/* no results */}
          {data.length < 1 && !pending && (
            <h1 className="flex-center h-full text-lg font-medium text-neutral-400">
              No results to show...
            </h1>
          )}
          {/*🔃🔃🔃  LOADING..... 🔃🔃🔃*/}
          {pending &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                className="flex items-center gap-x-7 px-4 py-4 "
                key={"skeleton-search-item" + idx}
              >
                <div className="aspect-[2/3] min-w-[75px] animate-pulse bg-[#222]"></div>
                <p className="space-y-4">
                  <span className="block h-7 w-64 animate-pulse bg-[#222]"></span>
                  <span className="block h-7 w-16 animate-pulse bg-[#222]"></span>
                </p>
              </div>
            ))}

          {/* results */}
          {searchResults && (
            <div>
              <Link
                to={`/search?query=${searchbox.current.value}`}
                className="float-right w-28 cursor-pointer p-3 text-end text-xl font-semibold"
                onClick={() => setIsSearchOpen(false)}
              >
                Show all
              </Link>
            </div>
          )}
          <div className="clear-both" />
          {searchResults}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
