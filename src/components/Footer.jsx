import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrapper mx-auto flex max-w-7xl flex-col items-center justify-between gap-y-4 p-4 sm:flex-row">
        {/* logo */}
        <Link
          to={"/"}
          className="mt-0.5 flex cursor-pointer select-none items-center font-monoton text-xl font-medium text-blue-500 md:text-4xl"
        >
          MovieMaze
          <span className="font-poppins text-sm font-semibold">.HD</span>
        </Link>
        <span className="text-neutral-300">
          Copyright &copy; {year} Ahmed Yasser
        </span>
      </div>
    </footer>
  );
};
export default Footer;
