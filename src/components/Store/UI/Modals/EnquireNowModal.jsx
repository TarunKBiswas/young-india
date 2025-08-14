import { webState } from "../../../../data/webStates";
import { useSnapshot } from "valtio";
import {
  lengthMsg,
  phoneRegExp,
  reqMsg,
} from "../../../../utils/Store/Constant";
import { enquireLeads } from "../../../../utils/Store/Products";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SuccessAlert } from "../../../Toast";
import SimpleModal from "../../../Admin/Modals/SimpleModal";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  phone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
});

const EnquireNowModal = () => {
  const snap = useSnapshot(webState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    ...(!snap.resellerToken && {
      resolver: yupResolver(schema),
    }),
  });

  const prodData = snap.singleProductInfo;

  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState("");
  const [noteError, setNoteError] = useState("");
  const userInfo = snap?.userData?.data;

  const closeModalHandler = () => {
    webState.showEnquireNowModal = false;
  };

  const submitEnquireHandler = async (data) => {
    if (quantity === null || quantity <= 0) {
      setQuantityError("Quantity must be atleast 1");
    } else {
      setQuantityError("");
    }

    if (note?.trim()?.length < 4) {
      setNoteError("Must be atleast 4 characters long");
    } else {
      setNoteError("");
    }
    const data2 = {
      StoreUserId: snap?.userData?.id,
      ProductId: prodData?.id,
      source: "WEBSITE",
      staff_note: note,
      quantity,
    };

    if (!snap.resellerToken) {
      data2.name = userInfo?.username || data?.name;
      data2.phone = userInfo?.phone || `+91 ${data?.phone}`;
    }

    try {
      let res = await enquireLeads(data2);
      if (res?.status === 200 || res?.status === 201) {
        SuccessAlert("Enquiry Submitted");
        webState.showEnquireNowModal = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const thumbnailUrl = prodData?.thumbnail?.url;

  return (
    <SimpleModal
      closeModalHandler={closeModalHandler}
      position={"items-center"}
    >
      <div className=" w-full rounded-md flex-col gap-3 inline-flex p-3 h-auto">
        <div className="w-full flex flex-col gap-2">
          <span className="text-2xl font-medium text-black">
            Create Enquiry
          </span>
          <hr className="w-full" />
        </div>

        <div className="flex items-center justify-start gap-3 w-full bg-[#F9F9F6] rounded-l-full py-2">
          <img
            className=" h-20 w-24  rounded-full "
            src={thumbnailUrl}
            width={"auto"}
            height={"auto"}
            alt="image"
          />
          <div className="w-full flex flex-col items-center justify-center md:items-start ">
            <h1 className="text-gray-900 font-medium items-center justify-center md:items-start md:justify-start text-sm lg:text-base">
              {prodData?.name}
            </h1>
            <p className="flex text-xs text-black/80">
              {prodData?.desc?.length > 100
                ? `${prodData?.desc?.substring(0, 100)}...`
                : prodData?.desc}
            </p>
          </div>
        </div>
        <form
          className="w-full flex flex-col gap-2 mt-2 "
          onSubmit={handleSubmit((data) => {
            submitEnquireHandler(snap.resellerToken ? {} : data);
          })}
        >
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {!snap.resellerToken && (
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2">
                <div className="w-full flex flex-col ">
                  <input
                    type="text"
                    className="webInput text-sm focus:outline-none"
                    placeholder="Name"
                    {...register("name")}
                  />
                  <p className="text-red-600 text-sm">{errors.name?.message}</p>
                </div>
                <div className="w-full flex flex-col ">
                  <input
                    type="text"
                    className="webInput text-sm focus:outline-none "
                    placeholder="Phone"
                    {...register("phone", {
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                      max: 10,
                    })}
                  />
                  <p className="text-red-600 text-xs md:text-sm ">
                    {errors.phone?.message}
                  </p>
                </div>
              </div>
            )}

            <input
              type="number"
              min={0}
              className="webInputStyle "
              value={quantity}
              placeholder="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
                setQuantityError("");
              }}
              required
            />
            {quantityError && (
              <p className="text-red-500 text-xs md:text-sm">{quantityError}</p>
            )}
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-2">
            <textarea
              cols={7}
              rows={5}
              value={note}
              placeholder="Type Your query or concern here..."
              onChange={(e) => {
                setNote(e.target.value);
                setNoteError("");
              }}
              required
              className="w-full border bg-[#F9F9F6] text-sm"
            />
            {noteError && (
              <p className="text-red-500 text-xs md:text-sm">{noteError}</p>
            )}
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="bg-themecolor rounded text-white font-medium w-full py-2.5"
            >
              Enquiry Now
            </button>
          </div>
        </form>
      </div>
    </SimpleModal>
  );
};

export default EnquireNowModal;
