/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import CloseModalButton from "../UI/Buttons/CloseModalButton.jsx";

const FormModal = ({ title, closeModalHandler, children }) => {
  return (
    <>
      <div className="bg-black/[.50] fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center">
        <div className="relative w-full max-w-2xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow w-full">
            <div className="px-4">
              <div className="row ">
                <div className="col-12">
                  <div className="row">
                    <div className="col-sm-12 m-auto">
                      <div className="card mb-0">
                        <div className="card-body ">
                          <div className="title-header option-title flex items-start">
                            <span className="text-lg font-semibold">
                              {title}
                            </span>
                            <CloseModalButton
                              closeModalHandler={closeModalHandler}
                            />
                          </div>
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                            >
                              {children}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModal;
