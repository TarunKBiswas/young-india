/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import Actions from "../UI/Actions";
import CreateButton from "../UI/Buttons/CreateButton";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable";
import { state } from "../../../data/state";
import { useSnapshot } from "valtio";
import moment from "moment";
import { getCoupons, updateCouponStatus } from "../../../utils/Coupons";
import toast from "react-hot-toast";
import OutletWrapper from "../../../Pages/OutletWrapper";
import dayjs from "dayjs";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const snap = useSnapshot(state);
  const pagination = snap.couponsPagination;

  const getData = useCallback(async (currentPage) => {
    try {
      let res = await getCoupons(currentPage, pagination.dataPerPage);
      // console.log(res);
      if (res.status === 200) {
        setCoupons(res?.data?.data);
        state.couponsPagination = {
          currentPage: res?.data?.meta?.pagination?.page,
          dataPerPage: res?.data?.meta?.pagination?.pageSize,
          totalData: res?.data?.meta?.pagination?.total,
          totalPage: res?.data?.meta?.pagination?.pageCount,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData(pagination.currentPage);
    state.refreshCouponList = false;
  }, [snap.refreshCouponList, pagination.currentPage]);

  const deleteCouponHandler = (id) => {
    state.selectedCouponID = id;
    state.showDeleteCouponModal = true;
  };

  const addCouponHandler = () => {
    state.showAddCouponModal = true;
  };

  const autoUpdateCouponStatus = () => {
    coupons?.forEach(async (coupon) => {
      const isExpired = dayjs().isAfter(dayjs(coupon?.valid_to || "" || null));

      if (isExpired && coupon?.active) {
        try {
          await updateCouponStatus(coupon?.id, { active: false });
          toast.success(
            `Coupon ${coupon?.coupon_code} status updated to inactive!`
          );
          state.refreshCouponList = true;
        } catch (error) {
          console.error(`Error updating coupon ${coupon?.id}:`, error);
        }
      }
    });
  };

  useEffect(() => {
    autoUpdateCouponStatus();
  }, [coupons]);

  const statusChangeHandler = async (id) => {
    coupons?.map((item) => {
      if (item?.id === id) {
        try {
          toast.promise(updateCouponStatus(id, { active: !item.active }), {
            loading: "Updating...",
            success: <b>Coupon Updated!</b>,
            error: <b>Could not save.</b>,
          });

          state.refreshCouponList = true;
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-2xl font-semibold">Coupons</span>
        <div className="max-w-2xl flex flex-col md:flex-row items-center gap-2.5">
          <CreateButton action={addCouponHandler} title={"Create New"} />
        </div>
      </div>
      {coupons?.length > 0 && (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Code</TH>
              <TH>Discount Type</TH>
              <TH>Discount Value</TH>
              <TH>Status</TH>
              <TH>Collection</TH>
              <TH>Valid From</TH>
              <TH>Valid To</TH>
              <TH>Action</TH>
            </TR>
          </THead>
          <TBody>
            {coupons?.map((coupon) => {
              return (
                <TR key={coupon?.id}>
                  <TD>{coupon?.id}</TD>
                  <TD>
                    <span className="px-2 py-1 bg-yellow-400 text-gray-800 font-medium rounded">
                      {coupon?.coupon_code}
                    </span>
                  </TD>
                  <TD>{coupon?.discount_type}</TD>
                  <TD>
                    <span className="font-medium text-sm">
                      {coupon?.discount_value}
                      {coupon?.discount_type === "PERCENTAGE" ? " %" : " ₹"}
                    </span>
                  </TD>
                  <TD>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={coupon?.active}
                        onChange={() => statusChangeHandler(coupon?.id)}
                      />
                      <div className="w-9 h-5 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#222222]"></div>
                    </label>
                  </TD>
                  <TD>{coupon?.collection?.name}</TD>
                  <TD>{moment(coupon?.valid_from)?.format("DD-MM-YY")}</TD>
                  <TD>{moment(coupon?.valid_to)?.format("DD-MM-YY")}</TD>
                  <TD>
                    <Actions
                      data={coupon}
                      deleteHandler={deleteCouponHandler}
                    />
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </XTable>
      )}
    </OutletWrapper>
  );
};

export default Coupons;
