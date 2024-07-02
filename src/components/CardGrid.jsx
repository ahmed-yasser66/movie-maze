import Card from "./Card";
import SkeletonCard from "./SkeletonCard";

const CardGrid = ({ data, type, error, loading }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-primary p-6 min-[430px]:mx-10 min-[500px]:mx-0 md:p-6">
      <div className="flex flex-wrap [margin:-20px_-20px_0_0] lg:[margin:-2%_-2%_0_0]">
        {!loading &&
          !error &&
          data &&
          data.map((item) => {
            return (
              <div
                key={(item.name || item.title) + randomKey()}
                className="movie w-full [padding:20px_20px_0_0] min-[500px]:w-1/2 sm:w-1/3 md:w-1/4 lg:[padding:2%_2%_0_0] xl:w-1/5"
              >
                <Card type={type || item.media_type} id={item.id}>
                  <Card.Image
                    name={item.name || item.title}
                    src={item.poster_path || item.backdrop_path}
                  />
                  <Card.CardInfo
                    genres={item.genres || item.genre_ids}
                    name={item.name || item.title}
                    rate={item.vote_average}
                    year={item.release_date || item.first_air_date}
                  />
                </Card>
              </div>
            );
          })}

        {/*🔃🔃🔃  LOADING..... 🔃🔃🔃*/}
        {loading &&
          !error &&
          Array.from({ length: 8 }).map((_) => (
            <SkeletonCard key={randomKey() + "csk"} />
          ))}
      </div>
      {/* ⛔⛔⛔ ERROR ⛔⛔⛔ */}
      {!loading && error && (
        <h1 className="mt-5 text-center text-lg font-medium uppercase">
          ⛔ {error}
        </h1>
      )}
    </div>
  );
};
function randomKey() {
  const raw = "randomRANDOMKEYkey#$9";
  const words = raw.split("");

  let key = "";
  let i = 0;
  while (i < 6) {
    i++;
    const randomIdx = Math.floor(Math.random() * words.length);
    key += words[randomIdx];
  }
  return key;
}
export default CardGrid;
