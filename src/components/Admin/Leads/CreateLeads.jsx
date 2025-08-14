import { useEffect, useState } from "react";
import { listAllProducts } from "../../../utils/productsAPI.js";
import { getStaffList } from "../../../utils/usersAPI.js";
import { state } from "../../../data/state.js";
import { createLead } from "../../../utils/Leads.js";
import { useNavigate } from "react-router-dom";
import DataDropDown from "../UI/DataDropDown.jsx";
import { thankyouModalHandler } from "../../../utils/const_API.js";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const CreateLeads = () => {
  const [products, setProducts] = useState([]);
  // const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);

  const [data, setData] = useState({
    name: "",
    phone: "",
    source: "APP",
    // country_code: "+91",
  });

  // const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [assignedUser, setAssignedUser] = useState(null);
  const [staff_note, setStaffNote] = useState("");
  const [quantity, setquantity] = useState(1);

  const navigate = useNavigate();

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

  // const getUser = async () => {
  //   try {
  //     let res = await getUsers();
  //     if (res?.status === 200) {
  //       setUsers(res?.data?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  useEffect(() => {
    getProducts();
    // getUser();
    getStaff();
  }, []);

  const leadSubmitHandler = async () => {
    state.isLoading = true;
    let ProductId = selectedProduct?.id;
    // let UserId = selectedUser?.id;
    let staff = assignedUser?.id;
    let source = data?.source;
    try {
      // if (data.name === null || data.name === "") {
      //   let finalData = {
      //     ProductId,
      //     // UserId,
      //     AssignedTo: staff,
      //     source,
      //     staff_note,
      //     quantity,
      //   };
      //   let res = await createLead(finalData);

      //   if (res?.status === 201) {
      //     thankyouModalHandler();
      //     navigate("/leads");
      //   }
      // } else {
      let finalData = {
        ...data,
        ProductId,
        AssignedTo: staff,
        staff_note,
        quantity,
        source,
      };
      let res = await createLead(finalData);
      if (res?.status === 201) {
        thankyouModalHandler();
        navigate("/leads");
      }
      state.isLoading = false;
      // }
    } catch (error) {
      console.log(error);
    }
    state.isLoading = false;
  };

  return (
    <OutletWrapper>
      <div className="max-w-3xl mx-auto  rounded ">
        <div className="">
          <div className="w-full flex items-start justify-between">
            <div className="text-xl font-semibold">
              <h5>Create Lead</h5>
            </div>
          </div>

          {/*form start*/}
          <div className=" w-full flex flex-col gap-4 mt-4">
            <div className="w-full flex flex-col">
              <label className="">
                Name<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  className="w-full border-gray-200"
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
            </div>

            <div className="w-full flex flex-col">
              <label className="">
                Phone<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  className="w-full border-gray-200"
                  type="number"
                  placeholder="Phone Number"
                  value={data?.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>
            </div>
            {/* </>
            ) : null} */}

            {/* source */}
            <div className="w-full flex flex-col">
              <label>
                Source<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <select
                  className="border-gray-200 w-full"
                  onChange={(e) => setData({ ...data, source: e.target.value })}
                >
                  <option>Select Source</option>
                  <option value="APP">App</option>
                  <option value="WHATSAPP">Whatsapp</option>
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="YOUTUBE_CHANNEL">You tube</option>
                  <option value="WEBSITE">website</option>
                </select>
              </div>
            </div>

            {/* products */}
            <div className="w-full flex flex-col">
              <label>
                Product<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <DataDropDown
                  data={products}
                  selected={selectedProduct}
                  setSelected={setSelectedProduct}
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="w-full flex flex-col">
              <label>
                Quantity<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  type="number"
                  className="w-full border-gray-200"
                  min={1}
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                />
              </div>
            </div>

            {/* Assined to */}
            <div className="w-full flex flex-col">
              <label>Assigned To</label>
              <div className="w-full">
                <DataDropDown
                  data={staff}
                  selected={assignedUser}
                  setSelected={setAssignedUser}
                />
              </div>
            </div>

            {/*Staff note*/}
            <div className="w-full flex flex-col">
              <label>
                Staff Note<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <textarea
                  className="w-full border-gray-200"
                  rows={4}
                  value={staff_note}
                  onChange={(e) => setStaffNote(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-end">
              <button className="submitButton" onClick={leadSubmitHandler}>
                Submit
              </button>
            </div>
          </div>
          {/*Form End*/}
        </div>
      </div>
    </OutletWrapper>
  );
};

export default CreateLeads;
