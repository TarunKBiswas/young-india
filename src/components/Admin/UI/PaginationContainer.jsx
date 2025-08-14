/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const PaginationContainer = ({ pagination, getNextPage, getPrevPage }) => {
  let pages = [];

  for (
    let i = 1;
    i <= Math.ceil(pagination?.total / pagination?.pageSize);
    i++
  ) {
    pages?.push(i);
  }

  return (
    <div className="w-full flex items-center px-2 mt-4">
      <div className="w-full flex items-center justify-between">
        {pagination.page > 1 ? (
          <div className="paginationButton" onClick={getPrevPage}>
            <GoArrowLeft className="h-4 w-4" />
            <span>previous</span>
          </div>
        ) : (
          <div></div>
        )}
        <div className="text-sm font-medium">
          Showing {pagination?.page} of {pagination?.pageCount}
        </div>
        {pagination.pageCount > 1 ? (
          <div className="paginationButton" onClick={getNextPage}>
            <span>Next</span>
            <GoArrowRight className="h-4 w-4" />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PaginationContainer;
