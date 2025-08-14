/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../../data/state";
import { getStaffList } from "../../../../utils/usersAPI";
import CreateButton from "../../UI/Buttons/CreateButton";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable";
import UserAvatarInfo from "../../UI/UserAvatarInfo";
import RoleBadge from "../../UI/RoleBadge";
import Actions from "../../UI/Actions";
import NoDataAnime from "../../UI/NoDataAnime";
import PaginationContainer from "../../UI/PaginationContainer";

const StaffListing = () => {
  const snap = useSnapshot(state);
  const staff = snap.staffs;
  const pagination = snap.staffsPagination;

  const getData = async (page) => {
    try {
      let res = await getStaffList(page, pagination.pageSize);

      state.staffs = res?.data?.data;
      state.staffsPagination = {
        ...pagination,
        page: res?.data?.meta?.pagination?.page,
        pageSize: res?.data?.meta?.pagination?.pageSize,
        pageCount: res?.data?.meta?.pagination?.pageCount,
        total: res?.data?.meta?.pagination?.total,
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(pagination.page);
    state.refreshStaffList = false;
  }, [snap.refreshStaffList, pagination.page]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.staffsPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.staffsPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };
  const deleteHandler = (id) => {
    state.selectedUserID = id;
    state.showDeleteUserModal = true;
  };
  const editHandler = (id) => {
    state.selectedUserID = id;
    state.showEditStaffModal = true;
  };

  const addHandler = () => {
    state.showAddStaffModal = true;
  };

  return (
    <>
      <div className="px-2">
        <div className="w-full flex items-center justify-between pb-4 pt-2 mt-16 lg:mt-0">
          <span className="text-black text-2xl font-semibold"></span>
          <CreateButton title={"Create Staff"} action={addHandler} />
        </div>

        {staff?.length > 0 && (
          <XTable>
            <THead>
              <TR>
                <TH>ID</TH>
                <TH>User</TH>
                <TH>Wallet Balance</TH>
                {/* <TH>Type</TH> */}
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {staff?.map((staff) => (
                <TR key={staff?.id}>
                  <TD>{staff?.id}</TD>
                  <TD>
                    <UserAvatarInfo user={staff} />
                  </TD>
                  <TD>
                    <span className="font-semibold">
                      ₹ {staff?.wallet_balance || 0}
                    </span>
                  </TD>
                  {/* <TD>
                    <RoleBadge role={staff?.role?.name} />
                  </TD> */}
                  <TD>
                    <Actions
                      data={staff}
                      deleteHandler={deleteHandler}
                      editHandler={editHandler}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </XTable>
        )}
      </div>

      {staff?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
        />
      )}
    </>
  );
};

export default StaffListing;
