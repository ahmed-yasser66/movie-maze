import { memo } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import CardGrid from "../CardGrid";
import { baseUrl } from "../../data/Provider";

const Recommendations = () => {
  const { type, id } = useParams();
  const url =
    type == "movie"
      ? `${baseUrl}/movie/${id}/recommendations`
      : `${baseUrl}/tv/${id}/recommendations`;

  const { data, loading, error } = useFetch(url);

  if (data?.results?.length < 1) {
    return (
      <h1 className="mb-7 mt-24 text-center text-[26px] font-medium">
        No Recommendations
      </h1>
    );
  }
  return (
    <>
      <h1 className="mb-7 mt-24 text-center text-[26px] font-medium">
        Recommendations
      </h1>
      <CardGrid
        data={data?.results?.slice(0, 5)}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default memo(Recommendations);
