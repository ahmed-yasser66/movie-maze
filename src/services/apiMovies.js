import { baseUrl } from "../data/Provider";
import { options } from "../utils/useFetch";

export async function getDetails(type, id) {
  // variables
  const isMovie = type === "movie";
  const url = isMovie ? `${baseUrl}/movie/${id}` : `${baseUrl}/tv/${id}`;
  const providersUrl = isMovie
    ? `${baseUrl}/movie/${id}/watch/providers`
    : `${baseUrl}/tv/${id}/watch/providers`;

  // requests
  try {
    let [detailsResponse, providersResponse] = await Promise.all([
      fetch(url, options),
      fetch(providersUrl, options),
    ]);
    if (!detailsResponse.ok || !providersResponse.ok) {
      throw Error("something went wrong");
    }
    const details = await detailsResponse.json();
    const providers = await providersResponse.json();

    return {
      details,
      providers,
    };
  } catch (error) {
    throw new Response(error.message, { status: 404 });
  }
}
