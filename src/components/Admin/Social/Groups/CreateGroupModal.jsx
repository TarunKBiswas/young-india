import { useState } from "react";
import { state } from "../../../../data/state.js";
import { createGroup } from "../../../../utils/Groups.js";
import { thankyouModalHandler } from "../../../../utils/const_API.js";
import SimpleModal from "../../Modals/SimpleModal.jsx";

const CreateGroupModal = () => {
  const [data, setData] = useState({
    name: "",
    url: "",
  });

  const createGroupHandler = async () => {
    state.createNewGroupModal = false;

    try {
      let res = await createGroup(data);

      if (res?.status === 201) {
        state.refreshGroupList = true;
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.createNewGroupModal = false;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-lg"}>
      <div className="p-8 w-full flex flex-col gap-4">
        <div className="w-full">
          <label htmlFor="">Name</label>
          <input
            className="formInput"
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <div className="">
            <label htmlFor="">URL</label>
            <input
              className="formInput"
              type="url"
              placeholder="URL"
              onChange={(e) =>
                setData({
                  ...data,
                  url: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <button className="submitButton" onClick={createGroupHandler}>
            Create
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default CreateGroupModal;
