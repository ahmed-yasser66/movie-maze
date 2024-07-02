import { lazy, useEffect } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
// helpers
import setMetaTags from "../utils/setMetaTags";
// data
import { ChevronRight } from "../data/icons";
import { description, title } from "../data/Provider";
//components
import { Hero } from "../components/landing";

const TopRated = lazy(() =>
  import("../components/landing").then((module) => ({
    default: module.TopRated,
  }))
);
const PopularTvShows = lazy(() =>
  import("../components/landing").then((module) => ({
    default: module.PopularTvShows,
  }))
);

const Landing = () => {
  window.scrollTo(0, 0);
  //meta tags
  useEffect(() => {
    setMetaTags({
      title,
      description,
      image: "/og.webp",
      url: window.location.href,
    });
  }, []);

  return (
    <>
      <section className="trending--movies mx-auto max-w-7xl p-4">
        <h1 className="mb-7 text-center text-[26px] font-medium">Trending</h1>
        <div className="swiper--wrapper rounded-xl bg-primary p-5 lg:p-7">
          <Hero
            nextButtonSelector={".next-slide-btn"}
            prevButtonSelector={".prev-slide-btn"}
          />
        </div>
        <div className="buttons mt-5 flex justify-center gap-x-8 font-sans lg:justify-end">
          {["prev-slide-btn rotate-180", "next-slide-btn"].map((item) => (
            <span
              key={item}
              className={`${item} flex-center cursor-pointer select-none rounded-full bg-primary p-4 text-center font-semibold duration-200 [font-size:2rem] [line-height:2rem] hover:bg-gray-500/30`}
            >
              <ChevronRight width={24} height={24} />
            </span>
          ))}
        </div>
      </section>
      {/* (〃￣︶￣)POPULAR TV SHOWS(￣︶￣〃) */}
      <LazyLoadComponent>
        <section className="popular--tv-shows mx-auto mt-14 max-w-7xl px-4">
          <h1 className="mb-7 text-center text-[26px] font-medium">
            Popular Tv Shows
          </h1>
          <PopularTvShows />
        </section>
      </LazyLoadComponent>
      {/* (〃￣︶￣)TOP RATED MOVIES(￣︶￣〃) */}
      <LazyLoadComponent threshold={0}>
        <section className="latest--movies mx-auto mt-14 max-w-7xl px-4">
          <TopRated />
        </section>
      </LazyLoadComponent>
    </>
  );
};
export default Landing;
