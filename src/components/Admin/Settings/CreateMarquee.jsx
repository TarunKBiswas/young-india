import { useState } from "react";
import { state } from "../../../data/state";
import MediaInput from "../UI/Inputs/MediaInput";
import { thankyouModalHandler, uploadImage } from "../../../utils/const_API";
import { createMarquee } from "../../../utils/Marquees";
import SimpleModal from "../Modals/SimpleModal";

const CreateMarquee = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const marqueeHandler = async () => {
    closeModalHandler();

    try {
      const formdata = new FormData();
      formdata.append("file", image);
      let res = await uploadImage(formdata);
      if (res?.status === 200) {
        let finalData = {
          name: title,
          active: true,
          ImageId: res?.data[0]?.id,
        };
        const res2 = await createMarquee(finalData);
        if (res2?.status === 200) {
          thankyouModalHandler();
          state.refreshMarqueeList = true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.createMarqueeModal = false;
  };

  return (
    <SimpleModal
      title={"Add Subscription"}
      closeModalHandler={closeModalHandler}
    >
      <div className="w-full flex flex-col gap-4 p-6 ">
        <div className="w-full flex flex-col items-start justify-center gap-1">
          <label className="w-48">Name</label>
          <input
            className="w-full border-gray-200 rounded placeholder:opacity-70 "
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <MediaInput
          label={"Image"}
          image={image}
          setImage={setImage}
          style={"flex flex-col gap-1"}
        />
        <div className="w-full flex justify-end ">
          <button className="submitButton" onClick={marqueeHandler}>
            Submit
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default CreateMarquee;
