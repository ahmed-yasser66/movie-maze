import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { loader } from "./pages/Details.jsx";
import AppLayout from "./components/AppLayout.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const LoaderFullscreen = lazy(
  () => import("./components/LoaderFullscreen.jsx"),
);
const Details = lazy(() => import("./pages/Details.jsx"));
const Error404 = lazy(() => import("./pages/Error404.jsx"));
const Movies = lazy(() => import("./pages/Movies.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const TvShows = lazy(() => import("./pages/TvShows.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error404 />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/tv",
          element: <TvShows />,
        },
        {
          path: "/:type/:id",
          element: <Details />,
          loader: loader,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<LoaderFullscreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;
