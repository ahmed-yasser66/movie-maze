import { MoviesGenres, TvShowGenres } from "../data/Provider";

export function getGenresList(genres, type) {
  return genres?.map((genre) => {
    return (type == "movie" ? MoviesGenres : TvShowGenres).find(
      (item) => item.id === genre.id,
    );
  });
}
