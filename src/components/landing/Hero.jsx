// Import Swiper styles
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../components/Card";
import useFetch from "../../utils/useFetch";
import { memo } from "react";

const Hero = ({ nextButtonSelector, prevButtonSelector }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { data, error, loading } = useFetch(
    `${baseUrl}/trending/movie/day?language=en-US`
  );
  const slides =
    Object.keys(data).length > 0
      ? data?.results?.slice(0, 10).map((item) => (
          <SwiperSlide key={item.title} className="max-w-64">
            <Card type={"movie"} id={item.id}>
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
          </SwiperSlide>
        ))
      : null;

  return (
    <Swiper
      slidesPerView={"auto"}
      slidesOffsetAfter={0}
      spaceBetween={10}
      navigation={{
        nextEl: nextButtonSelector,
        prevEl: prevButtonSelector,
      }}
      modules={[Navigation]}
      className="min-h-96 select-none"
    >
      {slides}

      {/*🔃🔃🔃  LOADING..... 🔃🔃🔃*/}
      {loading &&
        !error &&
        Array.from({ length: 5 }).map((_, idx) => (
          <SwiperSlide key={"movie" + idx} className="max-w-64">
            <div className="h-[423px] w-64 animate-pulse bg-[#222]"></div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default memo(Hero);
