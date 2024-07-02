import { useRef, useState } from "react";

import useFetch from "../../utils/useFetch";
import Pagination from "../../components/Pagination";
import CardGrid from "../../components/CardGrid";
import { scrollToSection } from "../../utils/helpers";

const baseUrl = process.env.REACT_APP_BASE_URL;
const TopRated = () => {
  const [page, setPage] = useState(1);
  const topRatedEl = useRef();

  const { data, error, loading } = useFetch(
    `${baseUrl}/movie/top_rated?page=${page}`,
  );

  const scrollToTopRatedSection = scrollToSection(topRatedEl.current);
  return (
    <>
      <h1
        className="mb-14 text-center text-[26px] font-medium"
        ref={topRatedEl}
      >
        Top Rated Movies
      </h1>

      <CardGrid
        data={data?.results?.slice(0, 8)}
        error={error}
        loading={loading}
        type={"movie"}
      />

      <Pagination
        totalPages={data?.total_pages}
        setPage={setPage}
        scrollFn={scrollToTopRatedSection}
      />
    </>
  );
};

export default TopRated;
