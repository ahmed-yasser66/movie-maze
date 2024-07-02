import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl, description } from "../data/Provider";
import { SearchIcon } from "../data/icons";
import { options } from "../utils/useFetch";
import setMetaTags from "../utils/setMetaTags";
import CardGrid from "../components/CardGrid";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const searchbox = useRef();
  const controllerRef = useRef();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = useCallback(async (query) => {
    if (controllerRef.current) controllerRef.current.abort();

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    try {
      setLoading(true);
      const resp = await fetch(`${baseUrl}/search/multi?query=${query}`, {
        ...options,
        signal,
        cache: "no-cache",
      });
      const data = await resp.json();
      if (data.length < 1 || !data.results.length) {
        return setError("enter a valid movie/series name");
      }
      const filteredData = data?.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv",
      );
      setData(filteredData);
      setError(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  });

  //meta tags
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      handleChange(query);
      initialRender.current = false;
      return;
    }
    setMetaTags({
      title: "MovieMaze: " + query,
      description,
      image: "/og.webp",
      url: window.location.href,
    });
  }, []);

  const search = () => {
    let timeoutId;
    return (e) => {
      setLoading(true);
      const searchTerm = e.target.value;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleChange(searchTerm);
      }, 500);
    };
  };
  const debounceSearch = useMemo(() => search(), []);

  return (
    <section className="search--results mx-auto my-14 min-h-screen max-w-7xl p-4 ">
      <div className="wrapper">
        <form
          className="search--wrapper relative mb-14 h-14 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="size-full w-full rounded-md border-none bg-primary px-14 text-lg font-medium outline-none placeholder:text-sm"
            placeholder="Search for something to watch...."
            onChange={debounceSearch}
            defaultValue={query}
            ref={searchbox}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon width={20} height={20} />
          </span>
        </form>

        <div className="results">
          {!searchbox.current?.value && !loading ? (
            <h1 className="text-lg font-medium">
              Type something to start search..
            </h1>
          ) : (
            <CardGrid data={data} loading={loading} error={error} />
          )}
        </div>
      </div>
    </section>
  );
};
export default Search;
