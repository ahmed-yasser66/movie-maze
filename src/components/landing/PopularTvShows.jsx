import useFetch from "../../utils/useFetch";
import CardGrid from "../../components/CardGrid";

const baseUrl = process.env.REACT_APP_BASE_URL;

const PopularTvShows = () => {
  const { data, error, loading } = useFetch(`${baseUrl}/tv/popular?page=1`);
  return (
    <CardGrid
      data={data?.results?.slice(0, 8)}
      error={error}
      loading={loading}
      type={"tv"}
    />
  );
};

export default PopularTvShows;
