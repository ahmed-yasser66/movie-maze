import { useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
// api
import { getDetails } from "../services/apiMovies";
// helpers
import setMetaTags from "../utils/setMetaTags";
import { formatDate, getGenresList } from "../utils/helpers";
// data
import imdb from "../data/imdb.webp";
import { PlayIcon } from "../data/icons";
// components
import { Providers, Recommendations, Video } from "../components/details";

const Details = () => {
  window.scrollTo(0, 0);
  const { details, providers } = useLoaderData();
  const genres = details.genres || getGenresList(details.genre_ids);
  const date = formatDate(details.release_date || details.first_air_date);

  const { type, id } = useParams();
  const [isVideo, setIsVideo] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    setMetaTags({
      title: "MovieMaze: " + (details.title || details.name),
      description: details.overview,
      image: `https://image.tmdb.org/t/p/w300${details.backdrop_path || details.poster_path}`,
      url: window.location.href,
    });
  }, [details.id]);

  return (
    <section className="mx-auto mb-24 mt-7 max-w-7xl overflow-hidden px-4 xl:px-0">
      {/* trailer video */}
      {isVideo && (
        <Video
          id={details.id}
          title={details.title || details.name}
          isVideo={isVideo}
          setIsVideo={setIsVideo}
          type={type}
        />
      )}
      {/* image and text content */}
      <div className="details--hero relative h-[calc(100vh_-_100px)] max-h-[550px] w-full">
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path || details.poster_path}`}
          placeholderSrc={`https://image.tmdb.org/t/p/w300/${details.backdrop_path}`}
          width={1920}
          height={1080}
          alt={details.title}
          className="size-full object-cover object-[40%_center] md:object-top"
          wrapperClassName="!absolute !size-full left-0 top-0"
          loading="eager"
          decoding="async"
        />
        {/* overlay */}
        <div className="absolute left-0 top-0 z-[2] size-full bg-gradient-to-t from-black from-10% via-black/20 to-black/65" />

        {/* text content */}
        <div className="text-content relative z-[3] flex h-full flex-col justify-between pb-32 ps-4 pt-4 text-4xl lg:pb-40 lg:ps-10 lg:pt-10 xl:w-1/2">
          {/* movie info */}
          <div className="movie--info">
            <h1>{details.title || details.name}</h1>
            {/* rate */}
            <p className="flex items-center gap-x-2 pt-4 text-sm font-semibold text-seconadry/70 lg:text-sm xl:text-base">
              {details.vote_average?.toFixed(1)}
              <img
                src={imdb}
                alt="imdb"
                width={30}
                height={30}
                loading="eager"
                decoding="async"
                ref={imageRef}
              />
              <span>{date}</span>
            </p>
            {/* language */}
            <span className="rounded-sm bg-blue-700 px-2 py-1 text-sm font-semibold xl:text-base">
              {details.original_language}
            </span>
          </div>
          {/* genres and cta button*/}
          <div className="flex flex-col gap-x-7 gap-y-8 sm:flex-row sm:items-center">
            <div className="genres w-2/3">
              <p className="text-sm font-semibold lg:text-base">Genres</p>
              {genres.map((genre, idx) => {
                return (
                  <span
                    className="text-xs font-semibold text-neutral-400 lg:text-sm"
                    key={genre.name}
                  >
                    {idx == genres.length - 1 ? genre.name : genre.name + " ,"}
                  </span>
                );
              })}
            </div>
            <button
              type="button"
              className="flex-center h-11 w-36 max-w-64 rounded-md bg-blue-700 text-xs font-medium uppercase duration-300 hover:bg-blue-800 lg:h-12 lg:w-44 lg:text-sm"
              onClick={() => setIsVideo(true)}
            >
              <PlayIcon width={30} height={30} />
              &nbsp; Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* overview */}
      <div className="details relative z-[2] -translate-y-20 text-center">
        <h1 className="pb-4 text-[26px]">{details.title || details.name}</h1>
        <p className="text-sm tracking-wider text-neutral-400 [line-height:1.6] md:text-base">
          {details.overview}
        </p>
      </div>
      {/* providers */}
      <Providers {...providers} />
      {/* Recommendations */}
      <LazyLoadComponent>
        <Recommendations id={id} type={type} />
      </LazyLoadComponent>
    </section>
  );
};

export async function loader({ params }) {
  return await getDetails(params.type, params.id);
}

export default Details;
