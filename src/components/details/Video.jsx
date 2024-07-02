import { useEffect } from "react";
import useFetch from "../../utils/useFetch";
import useKey from "../../utils/useKey";
import useOutsideClick from "../../utils/useOutsideClick";
import Loader from "../Loader";
const baseUrl = process.env.REACT_APP_BASE_URL;

function Video({ id, title, setIsVideo, type, isVideo }) {
  const url =
    type == "movie"
      ? `${baseUrl}/movie/${id}/videos`
      : `${baseUrl}/tv/${id}/videos`;
  const { data, loading, error } = useFetch(url);
  const ytvideo = data?.results?.find(
    (item) => item.type == "Teaser" || "Trailer",
  );

  useKey({
    state: isVideo === true,
    setState: setIsVideo,
    key: "Escape",
    newState: "close",
  });
  const ref = useOutsideClick({
    state: isVideo,
    setState: setIsVideo,
  });

  if (!Object.keys(data).length && loading && !error) {
    return (
      <h1 className="flex-center absolute left-0 top-0 z-10 size-full backdrop-blur-lg">
        <Loader />
        <span
          className="flex-center absolute right-6 top-8 size-14 cursor-pointer rounded-md text-center text-5xl font-extrabold hover:bg-gray-500/30 md:right-14"
          onClick={() => setIsVideo(false)}
        >
          &times;
        </span>
      </h1>
    );
  }

  if (Object.keys(data).length) {
    return (
      <div className="wrappper fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-lg">
        <article
          className="absolute left-1/2 top-1/2 aspect-video w-11/12 -translate-x-1/2 -translate-y-1/2 before:block before:pt-[56.25%] before:content-[''] md:w-8/12 lg:p-8"
          ref={ref}
        >
          {!error && !error && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${ytvideo?.key}`}
              className="absolute left-0 top-0 aspect-video size-full"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen={true}
            ></iframe>
          )}
          {/*🔃🔃🔃 LOADING...🔃🔃🔃*/}
          {!error && loading && <Loader />}
        </article>
        <span
          className="flex-center absolute right-6 top-8 size-14 cursor-pointer rounded-md text-center text-5xl font-extrabold hover:bg-gray-500/30 md:right-14"
          onClick={() => setIsVideo(false)}
        >
          &times;
        </span>
      </div>
    );
  }
}

export default Video;
