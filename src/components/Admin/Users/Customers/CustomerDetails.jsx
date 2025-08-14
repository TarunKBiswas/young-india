/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { state } from "../../../../data/state";
import {
  getSingleUserDetails,
  getUserDetails,
} from "../../../../utils/usersAPI.js";
import UserOrdersList from "./CustomerOrdersList";
import UserWalletList from "./CustomerWalletList";
import UserTransactions from "./CustomerTransactions";
import CustomerAddress from "./CustomerAddress";
import { useSnapshot } from "valtio";
import FormContainer from "../../UI/FormContainer.jsx";
import OutletWrapper from "../../../../Pages/OutletWrapper.jsx";

const UserDetails = () => {
  const param = useParams();
  const [pID] = useState(param.id);
  const [userDetails, setUserDetails] = useState(null);
  const [data, setData] = useState([]);
  const [active, setActive] = useState("order");
  const snap = useSnapshot(state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getDetails = async () => {
    try {
      let res = await getSingleUserDetails(pID);

      if (res?.status === 200) {
        setUserDetails(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
    state.refreshAddressList = false;
  }, [pID, snap.refreshAddressList]);

  const handleClick = async (event) => {
    setActive(event.target.id);
  };

  const getData = async () => {
    try {
      let res = await getUserDetails(pID, active);
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [active]);

  return (
    <OutletWrapper>
      <FormContainer title={"User Details"} />

      <div className=" bg-white w-full h-full max-h-full flex flex-col overflow-y-scroll gap-4 items-start p-3 scrollbar-hide px-4 md:px-10 mt-4">
        <div className="w-full flex items-center gap-4 font-medium">
          {userDetails?.avatar !== null ? (
            <div className="w-12 h-12 ">
              <img
                className="rounded-full shadow object-cover h-full w-full"
                src={userDetails?.avatar?.url}
                width={"auto"}
                height={"auto"}
                alt="image"
              />
            </div>
          ) : (
            <p className="h-12 w-12 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
              <span className="text-black text-lg font-semibold">
                {userDetails?.name?.charAt(0)}
              </span>
            </p>
          )}
          <div className="flex flex-col items-center text-xs">
            <ul>
              <li>{userDetails?.name}</li>
              <li>{userDetails?.phone}</li>
              <li>{userDetails?.email}</li>
            </ul>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <button
            className={
              active === "order"
                ? "filterBtn bg-[#222222] text-white"
                : "filterBtn"
            }
            onClick={handleClick}
            id="order"
          >
            Orders
          </button>
          <button
            className={
              active === "wallet"
                ? "filterBtn bg-[#222222] text-white "
                : "filterBtn"
            }
            onClick={handleClick}
            id="wallet"
          >
            Wallets
          </button>
          <button
            className={
              active === "transaction"
                ? "filterBtn bg-[#222222] text-white "
                : "filterBtn"
            }
            onClick={handleClick}
            id="transaction"
          >
            Transactions
          </button>
          <button
            className={
              active === "address"
                ? "filterBtn bg-[#222222] text-white "
                : "filterBtn"
            }
            onClick={handleClick}
            id="address"
          >
            Addresses
          </button>
        </div>

        {active === "order" ? <UserOrdersList orderData={data} /> : null}

        {active === "wallet" ? <UserWalletList walletData={data} /> : null}

        {active === "transaction" ? (
          <UserTransactions transactionData={data} />
        ) : null}

        {active === "address" ? <CustomerAddress addressData={data} /> : null}
      </div>
    </OutletWrapper>
  );
};

export default UserDetails;
