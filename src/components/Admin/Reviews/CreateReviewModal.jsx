import { useEffect, useState } from "react";
import { state } from "../../../data/state";
import SimpleModal from "../Modals/SimpleModal";
import InputCompState from "../UI/Inputs/InputCompState";
import { createUserReview } from "../../../utils/Store/Reviews";
import { uploadImage } from "../../../utils/const_API";
import DataDropDown from "../UI/DataDropDown";
import { listAllProducts } from "../../../utils/productsAPI";
import { SuccessAlert } from "../../Toast";

const CreateReviewModal = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  // const [avatar, setAvatar] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedProd, setSelectedProd] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [gallery, setGallery] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

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

  useEffect(() => {
    getProducts();
  }, []);

  // const handleRAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   setAvatar(file);
  // };

  const convertDateFormat = (inputDateStr) => {
    const dateObj = new Date(inputDateStr);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const hh = String(dateObj.getHours()).padStart(2, "0");
    const min = String(dateObj.getMinutes()).padStart(2, "0");
    const ss = String(dateObj.getSeconds()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  const createReviewHandler = async () => {
    let ProductId = selectedProd?.id;
    let data = {
      name: name,
      rating: rating,
      review: message,
      title: title,
      ProductId,
      createdAt: convertDateFormat(createdAt),
    };

    try {
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

      let res2 = await createUserReview(data);
      if (res2?.status === 200) {
        state.showCreateReviewModal = false;
        state.refreshReviewList = true;
        SuccessAlert("Review Added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    state.showCreateReviewModal = false;
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

  return (
    <SimpleModal modalSize={"max-w-2xl "} closeModalHandler={closeModalHandler}>
      <div className="w-full flex flex-col p-6">
        <div className="w-full grid grid-cols-2 items-start justify-center gap-2 ">
          <div className="mb-4 flex flex-col items-start">
            <label className="font-medium">Products</label>
            <div className="w-full">
              <DataDropDown
                data={products}
                selected={selectedProd}
                setSelected={setSelectedProd}
              />
            </div>
          </div>

          <InputCompState label={"Name"} value={name} setValue={setName} />

          <InputCompState
            label={"Rating"}
            type={"number"}
            value={rating}
            setValue={setRating}
          />

          <InputCompState label={"Title"} value={title} setValue={setTitle} />
        </div>

        <div className="w-full flex items-start gap-2 my-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="2"
              className="form-control w-100 border-gray-200 rounded "
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="">Message</label>
            <input
              type="date"
              className="form-control form-select w-100 border-gray-200 rounded"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full flex flex-col">
            <label className="w-full">Images</label>
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
                      width={"auto"}
                      height={"auto"}
                      alt="image"
                      className="h-[100px] w-full rounded-md object-cover"
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
        </div>
        <div className="w-full flex items-center justify-end mt-8">
          <button className="submitButton" onClick={createReviewHandler}>
            Create
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default CreateReviewModal;
