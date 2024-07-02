import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { getMinHeight } from "../utils/helpers";
import LoaderFullscreen from "../components/LoaderFullscreen";

export default function AppLayout() {
  useEffect(() => {
    getMinHeight();
  }, []);

  const isLoading = useNavigation().state === "loading";
  return (
    <>
      <Navbar />
      <main className="min-h-[var(--min-height)]">
        {isLoading && <LoaderFullscreen />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
