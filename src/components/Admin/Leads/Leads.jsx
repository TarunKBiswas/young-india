/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import { useEffect, useState } from "react";
import { getLeadsList, updateLeadStatus } from "../../../utils/Leads";
import { getStaffList } from "../../../utils/usersAPI";
import { thankyouModalHandler } from "../../../utils/const_API";
import { FailureAlert, SuccessAlert } from "../../Toast";
// import CreateButton from "../UI/Buttons/CreateButton";
import LeadFilters from "./LeadFilters";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable";
import LeadUserInfo from "./LeadUserInfo";
import ProductInfo from "./ProductInfo";
import moment from "moment";
import Actions from "../UI/Actions";
import NoDataAnime from "../UI/NoDataAnime";
import PaginationContainer from "../UI/PaginationContainer";
import OutletWrapper from "../../../Pages/OutletWrapper";

const Leads = () => {
  const snap = useSnapshot(state);
  const [leads, setLeads] = useState([]);
  const [source, setSource] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [staff, setStaff] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  const pagination = snap.productsPagination;

  const getLead = async (currentPage, status, source, type) => {
    try {
      let res = await getLeadsList(
        currentPage,
        pagination.pageSize,
        status,
        source,
        type
      );
      setLeads(res?.data?.data);
      state.leadsPagination = {
        ...pagination,
        page: res?.data?.meta?.pagination?.page,
        pageSize: res?.data?.meta?.pagination?.pageSize,
        pageCount: res?.data?.meta?.pagination?.pageCount,
        total: res?.data?.meta?.pagination?.total,
      };
      setFilterApplied(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLead(pagination.page, status, source, type);
    state.refreshLeadsList = false;
  }, [snap.refreshLeadsList, pagination.page, filterApplied]);

  useEffect(() => {
    getStaff();
  }, []);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.leadsPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.leadsPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const deleteHandler = (id) => {
    state.selectedLeadID = id;
    state.showDeleteLeadModal = true;
  };

  const infoHandler = (id) => {
    state.selectedLeadID = id;
    state.showLeadInfoModal = true;
  };

  const getStaff = async () => {
    try {
      let res = await getStaffList();

      if (res?.status === 200) {
        setStaff(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusChangeHandler = async (id, status) => {
    let data = { status: status };

    try {
      let res = await updateLeadStatus(id, data);
      if (res?.status === 200) {
        state.refreshLeadsList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const assignStaffHandler = async (id, assign_id) => {
  //   try {
  //     let res = await updateLeadStatus(id, { AssignedTo: assign_id });
  //     if (res?.status == 200) {
  //       state.refreshLeadsList = true;
  //       SuccessAlert("Staff Assigned");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     FailureAlert(error?.response?.data?.message);
  //   }
  // };

  const filterHandler = async () => {
    setFilterApplied(true);
  };

  const resetHandler = () => {
    getLead();
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-start justify-between flex-col">
        <div className="w-full flex items-center justify-between pb-4 pt-2 ">
          <span className="flex-1 text-black text-2xl font-semibold">
            Leads
          </span>

          <div className="w-full flex-1 flex items-center justify-end gap-3">
            <LeadFilters
              setSource={setSource}
              setType={setType}
              setStatus={setStatus}
              filterHandler={filterHandler}
              resetHandler={resetHandler}
            />
            {/* <CreateButton to={"add"} title={"Create Lead"} /> */}
          </div>
        </div>

        {leads?.length > 0 ? (
          <XTable>
            <THead>
              <TR>
                <TH>ID</TH>
                <TH>Info</TH>
                <TH>Product</TH>
                <TH>Status</TH>
                {/* <TH>Assigned Staff</TH> */}
                <TH>Date</TH>
                <TH>Action</TH>
              </TR>
            </THead>
            <TBody>
              {leads?.map((lead) => (
                <TR key={lead?.id}>
                  <TD>{lead?.id}</TD>
                  <TD>
                    <LeadUserInfo user={lead} />
                  </TD>
                  <TD>
                    <ProductInfo
                      product={lead?.product}
                      quantity={lead?.quantity}
                    />
                  </TD>
                  <TD className="w-full">
                    <select
                      className="border px-2 py-1 w-full mx-2"
                      onChange={(e) =>
                        statusChangeHandler(lead?.id, e.target.value)
                      }
                      defaultValue={lead?.status}
                    >
                      <option
                        value={lead?.status}
                        className="text-sm"
                        disabled
                        selected
                      >
                        {lead?.status}
                      </option>
                      <option value="OPEN">Open</option>
                      <option value="UNDER_CONNECTION">Under Connection</option>
                      <option value="FOLLOWUP">Followup</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="COMFIRMED">Confirmed</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </TD>
                  {/* <TD>
                    <select
                      className="border px-2 py-1 w-full mx-2"
                      onChange={(e) =>
                        assignStaffHandler(lead?.id, e.target.value)
                      }
                      defaultValue={lead?.assigned_to?.name}
                    >
                      <option
                        value={lead?.assigned_to?.name || "m,hvjh"}
                        className="text-sm"
                        disabled
                        selected
                      >
                        {lead?.assigned_to?.name || lead?.assigned_to?.username}
                      </option>
                      {staff?.map((staff) => (
                        <option key={staff?.id} value={staff?.id}>
                          {staff?.name || staff?.username}
                        </option>
                      ))}
                    </select>
                  </TD> */}
                  <TD>{moment(lead?.createdAt).format("DD MMM hh:mm")}</TD>
                  <TD>
                    <Actions
                      data={lead}
                      deleteHandler={deleteHandler}
                      infoHandler={infoHandler}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </XTable>
        ) : (
          <NoDataAnime msg={"No Leads Found"} />
        )}
      </div>
      {leads?.length > 0 ? (
        <PaginationContainer
          pagination={pagination}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
        />
      ) : null}
    </OutletWrapper>
  );
};

export default Leads;
