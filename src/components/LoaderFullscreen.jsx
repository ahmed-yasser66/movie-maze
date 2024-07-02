import Loader from "./Loader";

const LoaderFullscreen = () => {
  return (
    <div className="flex-center fixed left-0 top-0 z-50 h-screen w-screen bg-primary">
      <Loader />
    </div>
  );
};

export default LoaderFullscreen;
