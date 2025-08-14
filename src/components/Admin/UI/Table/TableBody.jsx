/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const TableBody = ({ children }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card card-table">
          <div className="card-body">
            <div className="table-responsive category-table">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBody;
