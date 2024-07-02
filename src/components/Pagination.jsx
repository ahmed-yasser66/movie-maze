import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, setPage, scrollFn }) => {
  return (
    <ReactPaginate
      pageCount={totalPages || 10}
      className="flex flex-wrap justify-center gap-x-4 py-7 text-lg"
      nextLabel={null}
      previousLabel={null}
      breakLinkClassName="pagination-link-page"
      nextClassName="fully-hidden"
      previousClassName="fully-hidden"
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      activeClassName="active-pagination-page"
      pageLinkClassName="pagination-link-page"
      pageClassName="pagination-page"
      onPageChange={(e) => {
        setPage(e.selected + 1);
        scrollFn();
      }}
    />
  );
};
export default Pagination;
