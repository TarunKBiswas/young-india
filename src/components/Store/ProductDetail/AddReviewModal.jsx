/* eslint-disable react/prop-types */
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { useState } from "react";
import { createUserReview } from "../../../utils/Store/Reviews";
import { FailureAlert, SuccessAlert } from "../../Toast";
import SimpleModal from "../../Admin/Modals/SimpleModal";
import { uploadImage } from "../../../utils/const_API";

const AddReviewModal = () => {
  const snap = useSnapshot(webState);
  const userId = snap.userData?.userId;
  const productId = snap.selectedID;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const submitReviewHandler = async () => {
    if (!title || !message) {
      FailureAlert("All fields (title, message, rating) are required.");
      return;
    }

    if (rating < 1 || rating > 5) {
      FailureAlert("Rating should be between 1 and 5.");
      return;
    }

    let data = {
      title,
      review: message,
      rating,
      user: userId,
      ProductId: productId,
    };

    if (gallery?.length > 0) {
      const galleryPromises = gallery?.map((image) => {
        const galleryFormData = new FormData();
        galleryFormData.append("file", image);
        return uploadImage(galleryFormData);
      });

      const galleryRes = await Promise.all(galleryPromises);

      data.gallery = galleryRes
        .filter((res) => res?.status === 200)
        .flatMap((res) => res?.data?.map((item) => item.id));
    }

    try {
      let res = await createUserReview(data);
      if (res?.status === 200) {
        webState.showAddReviewModal = false;
        webState.refreshReviewsList = true;
        SuccessAlert("Review added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const galleryImageHandler = async (e) => {
    const file = e.target.files;
    let galleryList = [];
    const filesArray = Array.from(file);
    setSelectedImages([...selectedImages, ...filesArray]);
    Object.keys(file)?.forEach(async (key) => {
      galleryList?.push(file[key]);
      setGallery([...gallery, ...galleryList]);
    });
  };

  const removeGalleryImage = (index) => {
    setGallery(gallery?.filter((item, i) => i !== index));
  };

  const closeModalHandler = () => {
    webState.showAddReviewModal = false;
  };

  return (
    <SimpleModal modalSize={"max-w-xl"} closeModalHandler={closeModalHandler}>
      <div className="p-4 w-full flex flex-col  gap-4 ">
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full">
            <label className="">
              Title<span className="text-red-500">*</span>
            </label>
            <div className="w-full ">
              <input
                className="form-control border-gray-200 rounded w-full"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="">
              Rating<span className="text-red-500">*</span>
            </label>
            <div className="w-full ">
              <input
                className="form-control border-gray-200 rounded w-full"
                type="number"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <label className="">
            Message<span className="text-red-500">*</span>
          </label>
          <div className="w-full ">
            <textarea
              className="w-full form-control border-gray-200 rounded "
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label className="w-full">Media</label>
          <div className="w-full">
            <input
              className="focus:outline-none cursor-pointer"
              type="file"
              multiple
              onChange={(e) => galleryImageHandler(e)}
            />
          </div>
        </div>

        <div className="w-full flex items-start gap-2">
          <div className="w-full gap-4 overflow-x-auto flex-nowrap grid grid-cols-5">
            {gallery?.map((image, i) => {
              return (
                <div key={i} className=" flex flex-col items-center ">
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-[100px] w-full rounded-md object-cover"
                    width={"auto"}
                    height={"auto"}
                    alt="image"
                  />
                  <div
                    onClick={() => removeGalleryImage(i)}
                    className="pt-1 font-semibold w-full text-center text-red-600 cursor-pointer"
                  >
                    Remove
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <div
            className="px-6 py-2 border bg-themecolor text-white font-medium rounded cursor-pointer"
            onClick={submitReviewHandler}
          >
            Add
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default AddReviewModal;
