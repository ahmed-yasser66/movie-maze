import { Link } from "react-router-dom";
// lazy-load-image
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
// providing data
import imdb from "../data/imdb.webp";
import { genresList } from "../utils/helpers";
const imgUrl = process.env.REACT_APP_IMAGE_BASE_URL;

function Card({ children, type, id }) {
  return (
    <LazyLoadComponent threshold={0}>
      <article className="group/card w-full">
        <Link
          role="link"
          aria-label={"view movie"}
          to={`/${type}/${id}`}
          className="relative flex aspect-[2/3] w-full cursor-pointer flex-col overflow-hidden"
          unstable_viewTransition
        >
          {children}
        </Link>
      </article>
    </LazyLoadComponent>
  );
}
function Image({ src, name }) {
  return (
    <>
      <div className="overlay pointer-events-none absolute left-0 top-0 z-[2] size-full bg-gradient-to-t from-[#121212]/85 from-25% to-transparent" />
      <LazyLoadImage
        width={300}
        height={200}
        className="absolute left-0 z-[1] size-full object-cover group-hover/card:scale-110"
        src={`${imgUrl}/w500${src}`}
        alt={name}
        threshold={0}
        effect="blur"
        wrapperClassName="!w-full !h-full"
        placeholderSrc="/favicon.svg"
      />
    </>
  );
}
function CardInfo({ name, genres = [], rate, year }) {
  function formatDate(date = "2024") {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
    }).format(new Date(date));
  }
  function getGenre(arr, target) {
    let right = 0,
      left = arr.length - 1;
    while (right <= left) {
      let midIdx = Math.floor((right + left) / 2);
      if (arr[midIdx].id === target) {
        return arr[midIdx].name;
      }
      if (arr[midIdx].id > target) left = midIdx - 1;
      else right = midIdx + 1;
    }
  }
  return (
    <div className="text-wrapper absolute bottom-1 z-[3] mb-2 w-full px-4">
      {/* release date */}
      <span className="slide-up mb-3 inline-block text-xs font-semibold text-seconadry/75">
        {formatDate(year)}
      </span>
      {/* name */}
      <h1 className="slide-up h-10 text-base font-medium">{name}</h1>
      {/* genres & rate */}
      <div className="my-2.5 flex items-center justify-between text-xs font-medium">
        <div className="genres slide-up h-6 w-5/6 leading-6 text-seconadry/70">
          {genres?.slice(0, 2).map((genre, idx) => {
            return (
              <span key={getGenre(genresList, genre) + "genre"}>
                {getGenre(genresList, genre)}
                {idx !== genres?.slice(0, 2).length - 1 && ", "}
              </span>
            );
          })}
        </div>
        {/* rate */}
        <p className="slide-left flex h-6 items-center gap-x-2 text-sm font-semibold leading-6 text-seconadry/70">
          {rate?.toFixed(1)}
          <img
            src={imdb}
            alt="imdb"
            width={24}
            height={24}
            loading="eager"
            decoding="async"
          />
        </p>
      </div>
    </div>
  );
}
Card.Image = Image;
Card.CardInfo = CardInfo;

export default Card;
