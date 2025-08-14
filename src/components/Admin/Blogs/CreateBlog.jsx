/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { FailureAlert, SuccessAlert } from "../../Toast";
import { state } from "../../../data/state";
import { uploadImage } from "../../../utils/const_API";
import { createBlog } from "../../../utils/blog";
import SimpleModal from "../Modals/SimpleModal";
import MediaInput from "../UI/Inputs/MediaInput";
import InputCompState from "../UI/Inputs/InputCompState";
import JoditEditor from "jodit-react";

const CreateBlog = ({ setCreateBlog, setRefreshList }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const editor = useRef(null);

  const closeModalHandler = () => {
    setCreateBlog(false);
  };

  const submitHandler = async () => {
    const data = {
      title,
      description: desc,
      content,
    };
    console.log(data);

    if (!thumbnail) {
      FailureAlert("please provide a thumbnail");
      return;
    }
    if (!title) {
      FailureAlert("please provide title");
      return;
    }
    if (!desc) {
      FailureAlert("please provide desc");
      return;
    }

    if (!content) {
      FailureAlert("please provide content");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", thumbnail);
      const res = await uploadImage(formData);
      if (res?.status === 200) {
        data.ThumbnailId = res?.data[0]?.id;
        const response = await createBlog(data);
        console.log(response);
        if (response?.status === 200) {
          SuccessAlert("Blog Added");
          setRefreshList(true);
          closeModalHandler();
        } else {
          throw new Error("Blog creation failed");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-xl"}>
      <div className="w-full p-4 flex flex-col gap-4">
        <MediaInput
          label={"Thumbnail"}
          image={thumbnail}
          setImage={setThumbnail}
          required
          recSize={"200 X 200"}
          style={"w-full flex flex-col gap-1 text-sm"}
        />
        <div className="w-full grid grid-cols-2 gap-4">
          <InputCompState
            type={"text"}
            label={"Title"}
            value={title}
            setValue={setTitle}
            required
          />
          <InputCompState
            type={"text"}
            label={"Description"}
            value={desc}
            setValue={setDesc}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <label className="text-sm">
            Content<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(e) => setContent(e)}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-end p-4">
        <button className="submitButton" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </SimpleModal>
  );
};

export default CreateBlog;
