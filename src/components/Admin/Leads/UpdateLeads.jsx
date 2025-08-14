/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { listAllProducts } from "../../../utils/productsAPI.js";
import { getStaffList, getUsers } from "../../../utils/usersAPI.js";
import ProductDropdown from "./dataDropdown";
import UserDropDown from "./UserDropDown";
import AssignedUserDropdown from "./AssignedUserDropdown";
import { useParams } from "react-router-dom";
import { getSingleLead } from "../../../utils/Leads.js";

const UpdateLeads = () => {
  const param = useParams();
  const [leadDetails, setLeadDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [aUser, setAUser] = useState([]);

  const [data, setData] = useState({
    name: "",
    phone: "",
    source: "",
    country_code: "+91",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [assignedUser, setAssignedUser] = useState(null);

  const getDetails = async () => {
    try {
      let res = await getSingleLead(param.id);

      setLeadDetails(res?.data?.data?.attributes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (leadDetails === null) {
      getDetails();
    }
  }, [param.id]);

  const getProducts = async () => {
    try {
      const res = await listAllProducts();
      if (res?.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      let res = await getUsers();
      if (res?.status === 200) {
        setUsers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStaff = async () => {
    try {
      let res = await getStaffList();
      if (res?.status === 200) {
        setAUser(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getUser();
    getStaff();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-sm-10 m-auto">
            <div className="card">
              <div className="card-body">
                <div className="w-full flex items-start justify-between">
                  <div className="card-header-2">
                    <h5>Update Lead</h5>
                  </div>
                </div>

                <div className="theme-form theme-form-2 mega-form mt-4">
                  {/* User */}
                  {leadDetails?.name === null ? (
                    <div className="my-4 row align-items-center">
                      <label className="col-sm-3 col-form-label form-label-title">
                        Users
                      </label>
                      <div className="col-sm-9">
                        <UserDropDown
                          users={users}
                          selectedUser={selectedUser}
                          setSelectedUser={setSelectedUser}
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* name and phone */}
                  {leadDetails?.name !== null ? (
                    <div>
                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-3 mb-0">
                          {" "}
                          Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) =>
                              setData({ ...data, name: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-3 mb-0">
                          Phone
                        </label>
                        <div className="col-sm-9">
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Phone Number"
                            value={data.phone}
                            onChange={(e) =>
                              setData({ ...data, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* source */}
                  <div className="my-4 row align-items-center">
                    <label className="col-sm-3 col-form-label form-label-title">
                      Source
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="select select-bordered w-full"
                        onChange={(e) =>
                          setData({ ...data, source: e.target.value })
                        }
                      >
                        <option value="APP">App</option>
                        <option value="WHATSAPP">Whatsapp</option>
                        <option value="INSTAGRAM">Instagram</option>
                        <option value="YOUTUBE_CHANNEL">You tube</option>
                        <option value="SOCIAL_SELLER_WEBSITE">
                          Social seller website
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* products */}
                  <div className="my-4 row align-items-center">
                    <label className="col-sm-3 col-form-label form-label-title">
                      Products
                    </label>
                    <div className="col-sm-9">
                      <ProductDropdown
                        product={products}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                      />
                    </div>
                  </div>

                  {/* Assined to */}
                  {leadDetails?.name === null ? (
                    <div className="my-4 row align-items-center">
                      <label className="col-sm-3 col-form-label form-label-title">
                        Assigned To
                      </label>
                      <div className="col-sm-9">
                        <AssignedUserDropdown
                          aUser={aUser}
                          assignedUser={assignedUser}
                          setAssignedUser={setAssignedUser}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="w-full flex items-center justify-end">
                    <button className="submitButton">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLeads;
