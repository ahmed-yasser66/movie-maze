import { useEffect, useRef, useState } from "react";

import { baseUrl, description, title } from "../data/Provider";
import setMetaTags from "../utils/setMetaTags";
import CardGrid from "../components/CardGrid";
import Pagination from "../components/Pagination";
import { scrollToSection } from "../utils/helpers";
import useFetch from "../utils/useFetch";
import Loader from "../components/Loader";

const Movies = () => {
  window.scrollTo(0, 0);
  const topPage = useRef();
  const [page, setPage] = useState(1);
  const { data, error, loading } = useFetch(
    `${baseUrl}/discover/movie?include_adult=false&page=${page}`,
  );
  // handling meta tags
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    setMetaTags({
      title,
      description,
      image: "/og-mv.webp",
      url: window.location.href,
    });
  }, []);

  const scrollToMoviesSection = scrollToSection(topPage.current);

  return (
    <section className="mx-auto min-h-[var(--min-height)] max-w-7xl px-4">
      <div className="wrapper my-14">
        <h1 className="mb-7 text-center text-[26px] font-medium" ref={topPage}>
          Discover: Cinematic Gems Await
        </h1>
        {/*🔃🔃🔃  LOADING..... 🔃🔃🔃*/}
        {loading && !error && (
          <div className="flex-center p-4">
            <Loader />
          </div>
        )}

        <CardGrid
          data={data?.results}
          error={error}
          loading={loading}
          type={"movie"}
        />

        <Pagination
          setPage={setPage}
          totalPages={500}
          scrollFn={scrollToMoviesSection}
        />
      </div>
    </section>
  );
};
export default Movies;
