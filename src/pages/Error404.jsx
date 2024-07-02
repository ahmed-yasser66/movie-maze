import { Link, useRouteError } from "react-router-dom";

const Error404 = () => {
  const error = useRouteError();

  return (
    <main className="flex h-screen max-h-[var(--min-height)] w-full flex-col items-center justify-center">
      <h1 className="text-9xl font-extrabold tracking-widest text-white">
        404
      </h1>
      <div className="absolute rotate-12 rounded bg-blue-600 px-2 text-sm">
        Page Not Found
      </div>
      <p>{error && error.data}</p>
      <button className="mt-5">
        <Link
          to={"/"}
          className="group relative inline-block text-sm font-medium text-blue-600 focus:outline-none focus:ring active:text-blue-600"
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative block border border-current bg-[#1A2238] px-8 py-3">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
};

export default Error404;
