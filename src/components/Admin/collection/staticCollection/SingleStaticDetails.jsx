/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { state } from "../../../../data/state.js";
import { getSingleStaticCollection } from "../../../../utils/staticCollection.js";
import { IP } from "../../../../utils/const_API.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";

const SingleStaticDetails = () => {
  const param = useParams();
  const [pID, setPiD] = useState(param.id);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      let res = await getSingleStaticCollection(pID);

      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <span className="text-[#222222] pb-4">
                <IoMdArrowRoundBack
                  className="hover:scale-125 transition-all duration-500 cursor-pointer text-xl"
                  onClick={() => navigate(-1)}
                />
              </span>
              <div className="title-header option-title">
                <h5>{data?.tag}</h5>
              </div>

              <XTable>
                <THead>
                  <TR>
                    <TH>ID</TH>
                    <TH>Image</TH>
                    <TH>Name</TH>
                    <TH>Category</TH>
                  </TR>
                </THead>
                <TBody>
                  {data?.products?.map((prod) => {
                    return (
                      <TR key={prod?.id}>
                        <TD>{prod?.id}</TD>
                        <TD>
                          <div className="">
                            <img
                              src={prod?.thumbnail?.url}
                              className="h-20 w-20"
                              alt="Image"
                              width="auto"
                              height="auto"
                            />
                          </div>
                        </TD>
                        <TD>{prod?.name}</TD>
                        <TD>{prod?.category?.name}</TD>
                      </TR>
                    );
                  })}
                </TBody>
              </XTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStaticDetails;
