/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../../data/state";
import { searchUser, usersListing } from "../../../../utils/usersAPI.js";
import { useEffect } from "react";
import SearchInput from "../../UI/SearchInput";
import CreateButton from "../../UI/Buttons/CreateButton";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable";
import UserAvatarInfo from "../../UI/UserAvatarInfo";
import Actions from "../../UI/Actions";
import PaginationContainer from "../../UI/PaginationContainer.jsx";
import { useNavigate } from "react-router-dom";

const UserListing = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const snap = useSnapshot(state);
  const userData = snap.users;
  const pagination = snap.usersPagination;

  const getUsers = async (page) => {
    try {
      const res = await usersListing(page, pagination.pageSize);
      if (res?.status === 200) {
        state.userDetails = res?.data;
        state.users = res?.data?.data;
        state.usersPagination = {
          ...pagination,
          page: res?.data?.meta?.pagination?.page,
          pageSize: res?.data?.meta?.pagination?.pageSize,
          pageCount: res?.data?.meta?.pagination?.pageCount,
          total: res?.data?.meta?.pagination?.total,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(pagination.page);
    state.refreshUsersTable = false;
  }, [snap.refreshUsersTable, pagination.page]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.usersPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.usersPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const deleteHandler = (id) => {
    state.selectedUserID = id;
    state.showDeleteUserModal = true;
  };

  const editUserHandler = async (id) => {
    state.selectedUserID = id;
    state.showEditUserModal = true;
  };

  const searchHandler = async () => {
    try {
      let res = await searchUser(search);
      if (res?.status === 200) {
        state.users = res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userDetailsHandler = (id) => {
    state.selectedUserID = id;
    navigate(`customers/${id}`);
  };

  const createUserHandler = () => {
    state.showAddUserModal = true;
  };

  return (
    <>
      <div className="px-2">
        <div className="w-full flex items-center justify-between pb-4 pt-2">
          <span className="text-2xl font-semibold"></span>
          <div className="max-w-2xl flex gap-3 mt-16 lg:mt-0">
            <div className="hidden lg:flex">
              <SearchInput
                search={search}
                setSearch={setSearch}
                handler={searchHandler}
              />
            </div>
            <div>
              <CreateButton action={createUserHandler} title={"Craete User"} />
            </div>
          </div>
        </div>

        {userData?.length > 0 && (
          <XTable>
            <THead>
              <TR>
                <TH>ID</TH>
                <TH>Info</TH>
                <TH>Cod </TH>
                <TH>Prepaid </TH>
                <TH>Wallet </TH>

                <TH>Action</TH>
              </TR>
            </THead>
            <TBody>
              {userData?.map((user) => (
                <TR key={user?.id}>
                  <TD>{user?.id}</TD>
                  <TD>
                    <UserAvatarInfo user={user} />
                  </TD>
                  <TD>
                    {user?.metric?.cod_orders ? user?.metric?.cod_orders : 0}
                  </TD>
                  <TD>
                    {user?.metric?.prepaid_orders
                      ? user?.metric?.prepaid_orders
                      : 0}
                  </TD>
                  <TD>
                    {user?.metric?.wallet_orders
                      ? user?.metric?.wallet_orders
                      : 0}
                  </TD>

                  <TD>
                    <Actions
                      data={user}
                      detailsHandler={userDetailsHandler}
                      deleteHandler={deleteHandler}
                      editHandler={editUserHandler}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </XTable>
        )}
      </div>

      {userData?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
        />
      )}
    </>
  );
};

export default UserListing;
