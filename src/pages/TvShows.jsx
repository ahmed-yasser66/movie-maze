import { useEffect, useRef, useState } from "react";

import { baseUrl, description, title } from "../data/Provider";
import setMetaTags from "../utils/setMetaTags";
import CardGrid from "../components/CardGrid";
import Pagination from "../components/Pagination";
import { scrollToSection } from "../utils/helpers";
import useFetch from "../utils/useFetch";

const TvShows = () => {
  window.scrollTo(0, 0);
  const [page, setPage] = useState(1);
  const tvShows = useRef();

  //meta tags
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
  const scrollToTvShowsSection = scrollToSection(tvShows.current);

  const { data, error, loading } = useFetch(
    `${baseUrl}/discover/tv?include_adult=false&page=${page}`,
  );

  return (
    <section className="mx-auto min-h-[var(--min-height)] max-w-7xl px-4">
      <div className="wrapper relative my-14">
        <h1 className="mb-7 text-center text-[26px] font-medium" ref={tvShows}>
          Uncover TV Treasures: Explore Now
        </h1>
        <CardGrid
          data={data?.results}
          error={error}
          loading={loading}
          type={"tv"}
        />
        <Pagination
          setPage={setPage}
          totalPages={500}
          scrollFn={scrollToTvShowsSection}
        />
      </div>
    </section>
  );
};

export default TvShows;
