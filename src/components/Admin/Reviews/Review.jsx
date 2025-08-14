/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getReviews } from "../../../utils/Reiews";
import CreateButton from "../UI/Buttons/CreateButton";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable";
import Actions from "../UI/Actions";
// import PaginationContainer from "../UI/PaginationContainer";
import { state } from "../../../data/state";
import { useSnapshot } from "valtio";
import OutletWrapper from "../../../Pages/OutletWrapper";
import PaginationContainer from "../UI/PaginationContainer";

const Reiews = () => {
  const [reviews, setReviews] = useState([]);
  const snap = useSnapshot(state);
  const pagination = snap.reviewsPagination;

  const getData = async (page) => {
    let res = await getReviews(page, pagination.pageSize);

    if (res?.status === 200) {
      setReviews(res.data?.data);
      state.reviewsPagination = {
        ...pagination,
        page: res?.data?.meta?.pagination?.page,
        pageSize: res?.data?.meta?.pagination?.pageSize,
        pageCount: res?.data?.meta?.pagination?.pageCount,
        total: res?.data?.meta?.pagination?.total,
      };
    }
  };

  useEffect(() => {
    getData(pagination.page);
    state.refreshReviewList = false;
  }, [pagination.page, snap.refreshReviewList]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.reviewsPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.reviewsPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const reviewDetailsHandler = (id) => {
    state.selectedReviewID = id;
    state.showReviewDetailsModal = true;
  };

  const createReviewModal = () => {
    state.showCreateReviewModal = true;
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2 mt-16 lg:mt-0">
        <span className="text-black text-2xl font-semibold">Reviews</span>
        <CreateButton action={createReviewModal} title={"Add New"} />
      </div>

      {reviews?.length > 0 && (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Product</TH>
              <TH>Total Reviews</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {reviews?.map((review) => (
              <TR key={review?.id}>
                <TD>{review?.id}</TD>
                <TD>
                  <div className="flex items-center">
                    <img
                      src={review?.thumbnail?.url}
                      className="w-10 h-10 rounded-full"
                      width={"auto"}
                      height={"auto"}
                      alt="image"
                    />
                    <span className="ml-2">{review?.name?.slice(0, 10)}</span>
                  </div>
                </TD>
                <TD>{review?.reviewCount}</TD>
                <TD>
                  <Actions data={review} infoHandler={reviewDetailsHandler} />
                </TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      )}
      {reviews?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
        />
      )}
    </OutletWrapper>
  );
};

export default Reiews;
