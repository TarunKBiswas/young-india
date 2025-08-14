/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SimpleModal from "../Modals/SimpleModal";
import { state } from "../../../data/state";
import { reviewDetails } from "../../../utils/Reiews";
import { useSnapshot } from "valtio";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable";
import Actions from "../UI/Actions";

const ReviewDetails = () => {
  const [details, setDetails] = useState("");
  const snap = useSnapshot(state);
  const id = snap.selectedReviewID;

  const getDetails = async (id) => {
    let res = await reviewDetails(id);
    setDetails(res?.data?.data);
  };

  useEffect(() => {
    getDetails(id);
    state.refreshReviewList = false;
  }, [snap.refreshReviewList]);

  const closeModalHandler = () => {
    state.showReviewDetailsModal = false;
  };

  const deleteReviewHandler = (id) => {
    state.selectedDeleteReviewID = id;
    state.showDeleteReviewModal = true;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-5xl"}>
      <div className="p-4 w-full flex flex-col gap-2 max-h-[700px] overflow-y-scroll">
        {details?.length > 0 && (
          <XTable>
            <THead>
              <TR>
                <TH>User</TH>
                <TH>Title</TH>
                <TH>Review</TH>
                <TH></TH>
              </TR>
            </THead>
            <TBody>
              {details?.map((details) => (
                <TR key={details?.id}>
                  <TD>
                    <div className="flex items-center gap-2">
                      <p className="h-12 w-12 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
                        <span className="text-black text-lg">
                          {details?.user?.name?.charAt(0) ||
                            details?.name?.charAt(0)}
                        </span>
                      </p>
                      <span>{details?.user?.name || details?.name}</span>
                    </div>
                  </TD>
                  <TD>{details?.title}</TD>
                  <TD style={"max-w-[400px]"}>{details?.review}</TD>
                  <TD>
                    <Actions
                      data={details}
                      deleteHandler={deleteReviewHandler}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </XTable>
        )}
      </div>
    </SimpleModal>
  );
};

export default ReviewDetails;
