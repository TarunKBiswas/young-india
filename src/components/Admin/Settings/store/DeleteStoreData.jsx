/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DeleteModalLayout from "../../Modals/DeleteModalLayout";
import { SuccessAlert } from "../../../Toast";
import { deleteAllData } from "../../../../utils/settings";
import { useSnapshot } from "valtio";
import { state } from "../../../../data/state";

const DeleteStoreData = () => {
  const [showDelButton, setShowDelButton] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showDelModal, setShowDelModal] = useState(false);

  const snap = useSnapshot(state);

  const conText = snap.brandInfo?.name;

  useEffect(() => {
    if (inputText === conText) {
      setShowDelButton(true);
    } else {
      setShowDelButton(false);
    }
  }, [inputText]);

  const deleteDataHandler = () => {
    setShowDelModal(true);
  };

  const deleteHandler = async () => {
    try {
      let res = await deleteAllData();
      if (res === true) {
        SuccessAlert("Data Deleted");
        closeModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    setShowDelModal(false);
    setInputText("");
  };

  return (
    <div className="mt-10 w-full flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="w-full flex flex-col gap-2">
          <div className="text-base  font-normal">
            To confirm delete, type
            <span className="text-lg font-bold"> {conText} </span> in the box
            below
          </div>
          <div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full border border-gray-200 p-2 rounded"
              placeholder="Type the confirmation message here"
            />
          </div>
          <div
            className={`w-full ${
              !showDelButton ? "hidden" : "flex"
            }  items-center justify-center border py-1.5 bg-red-500 rounded cursor-pointer font-semibold text-white capitalize text-sm`}
            onClick={deleteDataHandler}
          >
            delete Data
          </div>
        </div>
      </div>
      {showDelModal && (
        <DeleteModalLayout
          closeModalHandler={closeModalHandler}
          action={deleteHandler}
          confirmMsg={"Delete All The Data?"}
          btnText={"Delete"}
          msg={"Are you sure you want to delete all the data?"}
        />
      )}
    </div>
  );
};

export default DeleteStoreData;
