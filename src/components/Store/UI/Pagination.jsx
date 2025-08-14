/* eslint-disable react/prop-types */
const Pagination = (props) => {
  let pages = [];

  for (
    let i = 1;
    i <=
    Math.ceil(props?.pagination?.totalData / props?.pagination?.dataPerPage);
    i++
  ) {
    pages.push(i);
  }

  return (
    <>
      <div className="btn-group mt-4" data-theme="light">
        <button className="btn btn-outline" onClick={props?.getPrevPage}>
          «
        </button>
        <button className="btn btn-outline">
          {" "}
          {props?.pagination?.currentPage} of {props?.pagination?.totalPage}
        </button>
        <button className="btn btn-outline" onClick={props?.getNextPage}>
          »
        </button>
      </div>
    </>
  );
};

export default Pagination;
