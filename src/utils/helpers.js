/**
 * @returns use css variable  --min-height
 */
export function getMinHeight() {
  const nav = document.getElementsByTagName("nav");
  const footer = document.getElementsByTagName("footer");
  const navHeight = nav[0].getBoundingClientRect().height;
  const footerHeight = footer[0].getBoundingClientRect().height;
  const extraHeight =
    window.outerHeight - window.innerHeight + navHeight + footerHeight;
  const height = window.outerHeight - extraHeight;

  document
    .querySelector(":root")
    .style.setProperty("--min-height", height + "px");
}
export function formatDate(date) {
  return new Date(date)?.toDateString().split(" ").slice(1, 4).join(" ");
}

export const genresList = [
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 28,
    name: "Action",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
];
export function getGenresList(genres) {
  return genres?.map((genre) => {
    return genreBinarySearch(genresList, genre);
  });
}
export function genreBinarySearch(arr, target) {
  let right = 0,
    left = arr.length - 1;

  while (right > left) {
    let midIx = Math.floor(right + left / 2);
    if (arr[midIx].id == target) {
      return arr[midIx].name;
    }
    if (arr[midIx].id > target) {
      left = midIx + 1;
    } else {
      right = midIx - 1;
    }
  }
}

export function removeDuplicates(arr) {
  let filteredArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (
      filteredArray.find((item) => item.provider_id == arr[i].provider_id) ==
      undefined
    ) {
      filteredArray.push(arr[i]);
    }
  }

  return filteredArray;
}
/**
 * Accepts ref.current as parameter
 * @param el useRef element
 */
export function scrollToSection(el) {
  return () => {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
}
