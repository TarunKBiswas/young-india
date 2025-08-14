/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import { getCollections } from "../../../utils/collectionsAPI";
import { state } from "../../../data/state";
import SimpleModal from "../Modals/SimpleModal";
import { createCoupon } from "../../../utils/Coupons";
import { convertToDateTime } from "../../../utils/Store/Constant";
import { FailureAlert, SuccessAlert } from "../../Toast";
import InputCompState from "../UI/Inputs/InputCompState";

const CreateCouponModal = () => {
  const [coupon_code, setCouponCode] = useState("");
  const [collections, seCollections] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCollections, setSelectedCollections] = useState("");
  const [discount_type, setDiscount] = useState("");
  const [discount_value, setDiscountValue] = useState("");
  const [valid_from, setValidFrom] = useState("");
  const [valid_to, setValidTo] = useState("");

  const getCollectionData = async () => {
    try {
      let res = await getCollections();
      if (res?.status === 200) {
        seCollections(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollectionData();
  }, []);

  const closeModalHandler = () => {
    state.showAddCouponModal = false;
  };

  const handleStartDateChange = (event) => {
    setValidFrom(convertToDateTime(event.target.value));
  };

  const handleDueDateChange = (event) => {
    setValidTo(convertToDateTime(event.target.value));
  };

  const CreateCouponHandler = async () => {
    state.isLoading = true;
    let data = {
      coupon_code,
      CollectionId: selectedCollections,
      discount_type,
      discount_value,
      message,
      valid_from,
      valid_to,
    };
    if (
      data?.coupon_code ||
      data?.CollectionId ||
      data?.discount_type ||
      data?.discount_value ||
      data?.message !== "" ||
      data?.valid_from !== "" ||
      data?.valid_to !== ""
    ) {
      closeModalHandler();
      try {
        let res = await createCoupon(data);
        if (res?.status === 200 || 201) {
          SuccessAlert("Coupon Created");
          state.refreshCouponList = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        state.isLoading = false;
      }
    } else {
      FailureAlert("Please Fill all fields");
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-2xl"}>
      <div className="w-full flex flex-col p-4">
        <span className="mb-4 text-xl font-semibold">Add Coupon</span>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center gap-4">
            <InputCompState
              label={"Coupon Code"}
              value={coupon_code}
              setValue={setCouponCode}
              required
              size={"w-full flex flex-col gap-1"}
            />
            <div className="w-full flex flex-col">
              <label>
                Collection <span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <select
                  className="w-full border-gray-200 rounded"
                  name="state"
                  onChange={(e) => setSelectedCollections(e.target.value)}
                >
                  <option selected disabled>
                    Select Collection
                  </option>
                  {collections?.map((collection) => (
                    <option value={collection?.id} key={collection?.id}>
                      {collection?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center gap-4">
            <div className="w-full flex flex-col">
              <label htmlFor="">
                Disount Type <span className="text-red-500">*</span>
              </label>
              <select
                className="border-gray-200 rounded placeholder:text-sm"
                onChange={(e) => setDiscount(e.target.value)}
              >
                <option value="" selected>
                  Select Type
                </option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FLAT">Flat</option>
              </select>
            </div>
            <InputCompState
              label={"Discount Value"}
              value={discount_value}
              setValue={setDiscountValue}
              required
              type={"number"}
            />
          </div>

          <div className="w-full flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="w-full">
                Start Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="border px-2 h-10 rounded border-gray-200"
                onChange={handleStartDateChange}
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label className="w-full">Valid To</label>
              <input
                type="date"
                className="border px-2 h-10 rounded border-gray-200"
                onChange={handleDueDateChange}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label>
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              className="border rounded border-gray-200"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full flex items-center justify-end my-3">
            <button className="submitButton" onClick={CreateCouponHandler}>
              Create
            </button>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default CreateCouponModal;
