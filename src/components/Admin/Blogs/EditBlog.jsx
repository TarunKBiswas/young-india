/* eslint-disable react/prop-types */
import JoditEditor from "jodit-react";
import { useEffect, useState } from "react";
import { getSingleBlog, updateBlog } from "../../../utils/blog";
import { state } from "../../../data/state";
import { uploadImage } from "../../../utils/const_API";
import { SuccessAlert } from "../../Toast";
import MediaInputUpdate from "../UI/Inputs/MediaInputUpdate";
import SimpleModal from "../Modals/SimpleModal";
import InputCompState2 from "../UI/Inputs/InputCompState2";

const EditBlog = ({ selectedId, closeModalHandler, setRefreshList }) => {
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const [data, setData] = useState("");

  const getBlogData = async (id) => {
    try {
      let res = await getSingleBlog(id);
      if (res.status === 200) {
        setData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData(selectedId);
  }, [selectedId]);

  const updateHandler = async () => {
    let slug = title?.split(" ")?.join("-")?.toLowerCase();
    const finalData = {
      title: title || data?.title,
      description: desc || data?.description,
      content: content || data?.content,
      slug: slug || data?.slug,
    };
    closeModalHandler();

    try {
      if (newThumbnail !== null) {
        const formData = new FormData();
        formData.append("file", newThumbnail);
        let res = await uploadImage(formData);
        if (res.status === 200) {
          finalData.ThumbnailId = res.data[0].id;
        }
        const update = await updateBlog(selectedId, finalData);
        if (update.status === 200) {
          SuccessAlert("Blog Updated");
          setRefreshList(true);
        }
      } else {
        finalData.ThumbnailId = data?.ThumbnailId;
        const update = await updateBlog(selectedId, finalData);
        if (update.status === 200) {
          SuccessAlert("Blog Updated");
          setRefreshList(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-xl"}>
      <div className="w-full p-4 flex flex-col gap-4 overflow-y-scroll max-h-[600px] ">
        <MediaInputUpdate
          style={"flex-col itmes-start"}
          state={newThumbnail}
          setState={setNewThumbnail}
          label={"Thumbnail"}
          image={data?.thumbnail?.url}
        />
        <div className="w-full grid grid-cols-2 gap-4">
          <InputCompState2
            size={"w-full flex flex-col"}
            type={"text"}
            label={"Title"}
            defaultValue={data?.title}
            setValue={setTitle}
            required
          />
          <InputCompState2
            size={"w-full flex flex-col"}
            type={"text"}
            label={"Description"}
            defaultValue={data?.description}
            setValue={setDesc}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label>
            Content<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <JoditEditor
              value={data?.content}
              onChange={(value) => setContent(value)}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-end p-4">
        <button className="submitButton" onClick={updateHandler}>
          Update
        </button>
      </div>
    </SimpleModal>
  );
};

export default EditBlog;
